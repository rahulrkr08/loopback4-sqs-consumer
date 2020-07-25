import {bind, BindingSpec} from '@loopback/core';
import {asConsumeQueue, SqsConsumerOptions} from '../types';

export function consumeQueue(
  options: SqsConsumerOptions,
  ...specs: BindingSpec[]
) {
  const {queueUrl} = options;
  if (!queueUrl) throw new Error('Missing queue URL');

  return bind(asConsumeQueue(options), ...specs);
}
