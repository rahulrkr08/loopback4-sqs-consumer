# loopback4-sqs-consumer

This is a loopback-next extension for consuming events from AWS SQS Queue. This extension is using `sqs-consumer` for polling messages from SQS Queue, so please check for more about [configurations](https://github.com/bbc/sqs-consumer/blob/master/README.md#consumercreateoptions) and [usages](https://github.com/bbc/sqs-consumer/blob/master/README.md#usage).

# Install

```sh
npm install --save loopback4-sqs-consumer
```

# Usage

In order to use this component into your LoopBack application, please follow below steps.

### Add component to application.

```ts
// application.ts
import {SQS} from 'aws-sdk';
import {SqsConsumerBindings, SqsConsumerComponent, SqsConsumerConfig} from 'loopback4-sqs-consumer';
....

export class SQSConsumerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    ....

    const sqsConfig: SqsConsumerConfig = {
      sqs: new SQS({region: 'ap-south-1'})
    }

    this.configure(SqsConsumerBindings.COMPONENT).to(sqsConfig)
    this.component(SqsConsumerComponent)
    ....
  }
}
```
**NOTE:** Component need to configure with AWS `SQS` object.

### Create provider for consuming SQS Events

We need to create providers to consume events. Providers are decorated with `consumeQueue`, which will bind to application context, so it can be managed by the `SqsConsumerComponent` life cycles including start and stop polling.

```ts
import {Provider} from '@loopback/core';
import {consumeQueue, SqsSubscriber} from 'loopback4-sqs-consumer';

@consumeQueue({
  queueUrl: 'https://sqs.<region>.amazonaws.com/<account-id>/<queue-name>'
})
export class TestQueueSubscriberProvider implements Provider<SqsSubscriber> {
  constructor() {}

  async value() {
    return this.action.bind(this);
  }

  async action(message: any) {
    console.log('action', message)
  }
}

```

Please [click here](https://medium.com/@rahulrkr/loopback4-with-aws-sqs-polling-aa2cbc4c9529) medium post.

## License

[MIT](https://github.com/rahulrkr08/loopback4-sqs-consumer/blob/master/LICENSE)
