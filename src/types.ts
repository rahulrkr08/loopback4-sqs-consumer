import {BindingScope, BindingTemplate, NonVoid, ValueOrPromise} from '@loopback/core';
import {ConsumerOptions} from 'sqs-consumer';
import {SqsConsumerBindings, SqsConsumerOptionsKeyBindings} from './keys';

export const SQS_CONSUMER_EXTENSION = 'sqs.consumer.extension';

export type SqsConsumerConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sqs: any;
};

export interface SqsConsumerOptions extends ConsumerOptions {
  batch?: boolean;
}

export type SqsMessage = {
  [props: string]: string;
};

export function asConsumeQueue(options: SqsConsumerOptions): BindingTemplate {
  return binding => {
    binding
      .tag({
        [SqsConsumerOptionsKeyBindings.NAMESPACE]:
          SqsConsumerBindings.SQS_CONSUMER_NAMESPACE,
        [SqsConsumerOptionsKeyBindings.OPTIONS]: options,
      })
      .inScope(BindingScope.SINGLETON);
  };
}

export type Next = () => ValueOrPromise<NonVoid>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SqsConsumerReturnVal = NonVoid | any;

export interface SqsSubscriber {
  (message: SqsMessage): Promise<SqsConsumerReturnVal>;
}
