import {BindingKey} from '@loopback/core';
import {SqsConsumerComponent} from './sqs-consumer.component';

/**
 * Binding keys used by this component.
 */
export namespace SqsConsumerBindings {
  /**
   * Binding key for `CronComponent`
   */
  export const COMPONENT = BindingKey.create<SqsConsumerComponent>(
    'components.AwsComponent',
  );

  export const SQS_CONSUMER_NAMESPACE = 'aws.sqs';
}

export namespace SqsConsumerOptionsKeyBindings {
  export const OPTIONS = 'options';

  export const BATCH = 'batch';

  export const BATCH_SIZE = 'batch.size';

  export const QUEUE_URL = 'queue.url';

  export const NAMESPACE = 'namespace';
}
