# wrapped-sns-client

This package wraps the [SNS Client - AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/index.html) to provide consistent logging and other services.

# API Documentation

<a name="module_wrapped-sns-client"></a>

## wrapped-sns-client

* [wrapped-sns-client](#module_wrapped-sns-client)
    * [.WrappedSnsClient](#module_wrapped-sns-client.WrappedSnsClient)
        * [new exports.WrappedSnsClient([options])](#new_module_wrapped-sns-client.WrappedSnsClient_new)

<a name="module_wrapped-sns-client.WrappedSnsClient"></a>

### wrapped-sns-client.WrappedSnsClient
Wraps an AWS SNS client to provide standard logging & services.

**Kind**: static class of [<code>wrapped-sns-client</code>](#module_wrapped-sns-client)  
<a name="new_module_wrapped-sns-client.WrappedSnsClient_new"></a>

#### new exports.WrappedSnsClient([options])
WrappedSnsClient constructor.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Options. |
| [options.logger] | <code>object</code> | Logger instance (default is [global console object](https://nodejs.org/api/console.html#class-console)). Must have info, error & debug methods |
| [options.logInternals] | <code>boolean</code> | Log AWS client internals (default is false). |
| [options.config] | <code>object</code> | [SNSClientConfig](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/snsclientconfig.html). |


---

See more great templates and other tools on
[my GitHub Profile](https://github.com/karmaniverous)!
