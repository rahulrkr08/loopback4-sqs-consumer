import {
  Application,
  config,
  CoreBindings,
  inject,
  LifeCycleObserver,
} from '@loopback/core';
import {SqsConsumerBindings} from './keys';
import {SqsConsumer} from './sqs-consumer';
import {SqsConsumerConfig} from './types';

export class SqsConsumerObserver implements LifeCycleObserver {
  consumer: SqsConsumer;
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @config({fromBinding: SqsConsumerBindings.COMPONENT})
    private options: SqsConsumerConfig,
  ) {
    this.consumer = new SqsConsumer(this.app, this.options);
  }

  start() {
    return this.consumer.start();
  }

  stop() {
    return this.consumer.stop();
  }
}
