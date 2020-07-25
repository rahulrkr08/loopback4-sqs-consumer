import {BindingScope, BindingTemplate, Context, NonVoid, ValueOrPromise} from '@loopback/core';
import {ConsumerOptions} from 'sqs-consumer';
import {SqsConsumerBindings, SqsConsumerOptionsKeyBindings} from './keys';

export const SQS_CONSUMER_EXTENSION = 'sqs.consumer.extension';

export type SqsConsumerConfig = {
  sqs: any
};

export interface SqsConsumerOptions extends ConsumerOptions {
  batch?: boolean
};

/**
 * A binding template for auth strategy contributor extensions
 */
export function asConsumeQueue(options: SqsConsumerOptions): BindingTemplate {
  const {queueUrl, batch, batchSize} = options
  return binding => {
    binding
      .tag({
        [SqsConsumerOptionsKeyBindings.NAMESPACE]: SqsConsumerBindings.SQS_CONSUMER_NAMESPACE,
        [SqsConsumerOptionsKeyBindings.OPTIONS]: options
      })
      .inScope(BindingScope.SINGLETON);
  }
}

export type Next = () => ValueOrPromise<NonVoid>;

export type SqsSubscriber<C extends Context = Context> = (
  context: C,
  next: Next,
) => ValueOrPromise<NonVoid>;
