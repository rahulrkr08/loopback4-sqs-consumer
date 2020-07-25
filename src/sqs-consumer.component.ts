import {
  Application,
  BindingScope,
  Component,
  ContextTags,
  CoreBindings,
  extensionPoint,
  inject,
} from '@loopback/core';
import {SqsConsumerBindings} from './keys';
import {SqsConsumer} from './sqs-consumer';
import {SqsConsumerObserver} from './sqs-consumer.observer';
import {SQS_CONSUMER_EXTENSION} from './types';

@extensionPoint(SQS_CONSUMER_EXTENSION, {
  tags: {[ContextTags.KEY]: SqsConsumerBindings.COMPONENT},
  scope: BindingScope.SINGLETON,
})
export class SqsConsumerComponent implements Component {
  sqsConsumer: SqsConsumer;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {
    this.app.lifeCycleObserver(SqsConsumerObserver);
  }
}
