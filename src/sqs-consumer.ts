import {Application, Binding, BoundValue} from '@loopback/core';
import {Consumer} from 'sqs-consumer';
import {SqsConsumerBindings, SqsConsumerOptionsKeyBindings} from './keys';
import {SqsConsumerConfig, SqsConsumerOptions, SqsMessage} from './types';

export class SqsConsumer {
  poller: Promise<Consumer[]>;

  constructor(
    private app: Application,
    private sqsConsumerConfig: SqsConsumerConfig,
  ) {
    const queueBindings: Readonly<Binding<BoundValue>>[] = this.app.findByTag({
      [SqsConsumerOptionsKeyBindings.NAMESPACE]:
        SqsConsumerBindings.SQS_CONSUMER_NAMESPACE,
    });
    this.poller = this.createPollers(queueBindings);
  }

  private createPollers(
    queueBindings: Readonly<Binding<BoundValue>>[] = [],
  ): Promise<Consumer[]> {
    const {sqs} = this.sqsConsumerConfig;

    return Promise.all(
      queueBindings.map(async (queueBinding: Readonly<Binding>) => {
        const consumerOptions =
          queueBinding.tagMap[SqsConsumerOptionsKeyBindings.OPTIONS];
        const handlerFn: Function | undefined = await this.app.get(
          queueBinding.key,
        );
        const handler = (message: SqsMessage | Error) => handlerFn?.({message});
        const handlerKey = consumerOptions.batch
          ? 'handleMessageBatch'
          : 'handleMessage';
        const consumerParams: SqsConsumerOptions = {
          sqs,
          [handlerKey]: handler,
          ...consumerOptions,
        };

        const sqsConsumer: Consumer = Consumer.create(consumerParams);
        sqsConsumer.on('error', err => handler(new Error(err)));
        sqsConsumer.on('processing_error', err => handler(new Error(err)));

        return sqsConsumer;
      }),
    );
  }

  async start() {
    const pollers = await this.poller;
    pollers.map((poller: Consumer) => poller.start());
  }

  async stop() {
    const pollers = await this.poller;
    pollers.map((poller: Consumer) => poller.stop());
  }
}
