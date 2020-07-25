import {Application, BindingScope, Context, Provider} from '@loopback/core';
import {expect} from '@loopback/testlab';
import {
  SqsConsumer,
  SqsConsumerBindings,
  SqsConsumerComponent,
  SqsConsumerConfig,
  SqsConsumerOptionsKeyBindings,
  SqsConsumerReturnVal,
  SqsMessage,
  SqsSubscriber,
} from '../../';

describe('SqsConsumer (acceptance)', () => {
  let ctx: Context;
  let app: Application;
  const consumerConfig = {
    queueUrl: 'http://sqs/queue-name',
  };

  class SQS {
    constructor() {}
    receiveMessage() {
      return {
        promise: () => {},
      };
    }
  }

  const sqsConfig: SqsConsumerConfig = {
    sqs: new SQS(),
  };

  class TestQueueSubscriberProvider implements Provider<SqsSubscriber> {
    constructor() {}

    value() {
      return this.action.bind(this);
    }

    async action(message: SqsMessage): Promise<SqsConsumerReturnVal> {
      console.log('action', message);
    }
  }

  beforeEach(givenAppWithCron);

  afterEach(async () => {
    if (app) await app.stop();
    (app as unknown) = undefined;
  });

  it('allows sqs consumer to be bound', async () => {
    const sqsConsumers = new SqsConsumer(app, sqsConfig);
    const pollers = await sqsConsumers.poller;
    expect(pollers).to.length(1);
  });

  async function givenAppWithCron() {
    app = new Application(ctx);
    app.configure(SqsConsumerBindings.COMPONENT).to(sqsConfig);
    app.component(SqsConsumerComponent);
    app
      .bind('aws.sqs.consumer')
      .toProvider(TestQueueSubscriberProvider)
      .tag({
        [SqsConsumerOptionsKeyBindings.NAMESPACE]:
          SqsConsumerBindings.SQS_CONSUMER_NAMESPACE,
        [SqsConsumerOptionsKeyBindings.OPTIONS]: consumerConfig,
      })
      .inScope(BindingScope.SINGLETON);

    await app.start();
    return app;
  }
});
