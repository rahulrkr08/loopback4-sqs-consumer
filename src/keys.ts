// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/cron
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

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

  export const SQS_CONSUMER_PROVIDER = BindingKey.create<any>(
    'sqs.consumer.provider',
  );
}

export namespace SqsConsumerOptionsKeyBindings {

  export const OPTIONS = 'options';

  export const BATCH = 'batch';

  export const BATCH_SIZE = 'batch.size';

  export const QUEUE_URL = 'queue.url';

  export const NAMESPACE = 'namespace';
}
