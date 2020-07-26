import {BindingKey} from '@loopback/core';
import {SqsConsumerComponent} from './sqs-consumer.component';

export namespace SqsConsumerBindings {

  export const COMPONENT = BindingKey.create<SqsConsumerComponent>(
    'components.SqsConsumerComponent',
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
