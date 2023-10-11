[![Backup Status](https://cloudback.it/badge/VeteranCrowd/wrapped-sns-client)](https://cloudback.it)

# wrapped-sns-client

This package wraps the [SNS Client - AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/index.html) to provide consistent logging and other services.

# API Documentation

<a name="module_wrapped-sns-client"></a>

## wrapped-sns-client

* [wrapped-sns-client](#module_wrapped-sns-client)
    * _static_
        * [.WrappedSnsClient](#module_wrapped-sns-client.WrappedSnsClient)
            * [new exports.WrappedSnsClient([options])](#new_module_wrapped-sns-client.WrappedSnsClient_new)
            * _instance_
                * [.createTopic(topicName, [attributes])](#module_wrapped-sns-client.WrappedSnsClient+createTopic) ⇒ <code>Promise.&lt;string&gt;</code>
                * [.deleteTopic(topicArn)](#module_wrapped-sns-client.WrappedSnsClient+deleteTopic) ⇒ <code>Promise.&lt;boolean&gt;</code>
                * [.getTopicAttributes(topicArn)](#module_wrapped-sns-client.WrappedSnsClient+getTopicAttributes) ⇒ <code>Promise.&lt;object&gt;</code>
                * [.publish(options)](#module_wrapped-sns-client.WrappedSnsClient+publish) ⇒ <code>Promise.&lt;string&gt;</code>
                * [.crudOperationHandler(topicArn, [indexToken], [getEntity])](#module_wrapped-sns-client.WrappedSnsClient+crudOperationHandler) ⇒ <code>function</code>
            * _static_
                * [.decodeMessageAttributes(attributes)](#module_wrapped-sns-client.WrappedSnsClient.decodeMessageAttributes) ⇒ <code>DecodedMessageAttributes</code>
                * [.encodeMessageAttributes(attributes)](#module_wrapped-sns-client.WrappedSnsClient.encodeMessageAttributes) ⇒ <code>EncodedMessageAttributes</code>
    * _inner_
        * [~DecodedMessageAttributes](#module_wrapped-sns-client..DecodedMessageAttributes) : <code>Object.&lt;string, (string\|number)&gt;</code>
        * [~EncodedMessageAttributes](#module_wrapped-sns-client..EncodedMessageAttributes) : <code>Object.&lt;string, object&gt;</code>
        * [~GetEntityCallback](#module_wrapped-sns-client..GetEntityCallback) ⇒ <code>string</code>

<a name="module_wrapped-sns-client.WrappedSnsClient"></a>

### wrapped-sns-client.WrappedSnsClient
Wraps an AWS SNS client to provide standard logging & services.

**Kind**: static class of [<code>wrapped-sns-client</code>](#module_wrapped-sns-client)  

* [.WrappedSnsClient](#module_wrapped-sns-client.WrappedSnsClient)
    * [new exports.WrappedSnsClient([options])](#new_module_wrapped-sns-client.WrappedSnsClient_new)
    * _instance_
        * [.createTopic(topicName, [attributes])](#module_wrapped-sns-client.WrappedSnsClient+createTopic) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.deleteTopic(topicArn)](#module_wrapped-sns-client.WrappedSnsClient+deleteTopic) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.getTopicAttributes(topicArn)](#module_wrapped-sns-client.WrappedSnsClient+getTopicAttributes) ⇒ <code>Promise.&lt;object&gt;</code>
        * [.publish(options)](#module_wrapped-sns-client.WrappedSnsClient+publish) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.crudOperationHandler(topicArn, [indexToken], [getEntity])](#module_wrapped-sns-client.WrappedSnsClient+crudOperationHandler) ⇒ <code>function</code>
    * _static_
        * [.decodeMessageAttributes(attributes)](#module_wrapped-sns-client.WrappedSnsClient.decodeMessageAttributes) ⇒ <code>DecodedMessageAttributes</code>
        * [.encodeMessageAttributes(attributes)](#module_wrapped-sns-client.WrappedSnsClient.encodeMessageAttributes) ⇒ <code>EncodedMessageAttributes</code>

<a name="new_module_wrapped-sns-client.WrappedSnsClient_new"></a>

#### new exports.WrappedSnsClient([options])
WrappedSnsClient constructor.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Options. |
| [options.logger] | <code>object</code> | Logger instance (default is [global console object](https://nodejs.org/api/console.html#class-console)). Must have info, error & debug methods |
| [options.logInternals] | <code>boolean</code> | Log AWS client internals (default is false). |
| [options.config] | <code>object</code> | [SNSClientConfig](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/snsclientconfig.html). |

<a name="module_wrapped-sns-client.WrappedSnsClient+createTopic"></a>

#### wrappedSnsClient.createTopic(topicName, [attributes]) ⇒ <code>Promise.&lt;string&gt;</code>
Create SNS topic.

**Kind**: instance method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Topic ARN.  

| Param | Type | Description |
| --- | --- | --- |
| topicName | <code>string</code> | Topic name. |
| [attributes] | <code>object</code> | Topic attributes (see [reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/createtopiccommandinput.html#attributes)). |

<a name="module_wrapped-sns-client.WrappedSnsClient+deleteTopic"></a>

#### wrappedSnsClient.deleteTopic(topicArn) ⇒ <code>Promise.&lt;boolean&gt;</code>
Delete SNS topic.

**Kind**: instance method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if successful.  

| Param | Type | Description |
| --- | --- | --- |
| topicArn | <code>string</code> | Topic ARN. |

<a name="module_wrapped-sns-client.WrappedSnsClient+getTopicAttributes"></a>

#### wrappedSnsClient.getTopicAttributes(topicArn) ⇒ <code>Promise.&lt;object&gt;</code>
Get SNS topic attributes.

**Kind**: instance method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>Promise.&lt;object&gt;</code> - Topic attributes.  

| Param | Type | Description |
| --- | --- | --- |
| topicArn | <code>string</code> | Topic ARN. |

<a name="module_wrapped-sns-client.WrappedSnsClient+publish"></a>

#### wrappedSnsClient.publish(options) ⇒ <code>Promise.&lt;string&gt;</code>
Publish message to SNS.

**Kind**: instance method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Message ID.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Publish options. |
| [options.attributes] | <code>DecodedMessageAttributes</code> | [Message attributes.](DecodedMessageAttributes) |
| options.message | <code>object</code> \| <code>string</code> | Message content. |
| [options.messageStructure] | <code>object</code> | [Message structure](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#messagestructure). |
| [options.phoneNumber] | <code>object</code> | [Phone number](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#phonenumber). |
| [options.subject] | <code>string</code> | [Subject](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#subject) |
| [options.targetArn] | <code>string</code> | [Target ARN](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#targetarn) |
| [options.topicArn] | <code>string</code> | [Topic ARN](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#topicarn) |

<a name="module_wrapped-sns-client.WrappedSnsClient+crudOperationHandler"></a>

#### wrappedSnsClient.crudOperationHandler(topicArn, [indexToken], [getEntity]) ⇒ <code>function</code>
Generate a DynamoDB Streams CRUD Operation Lambda event handler.

**Kind**: instance method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>function</code> - Event handler.  

| Param | Type | Description |
| --- | --- | --- |
| topicArn | <code>string</code> | [Topic ARN](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#topicarn) |
| [indexToken] | <code>string</code> | Index token. |
| [getEntity] | <code>GetEntityCallback</code> | get entity callback. |

<a name="module_wrapped-sns-client.WrappedSnsClient.decodeMessageAttributes"></a>

#### WrappedSnsClient.decodeMessageAttributes(attributes) ⇒ <code>DecodedMessageAttributes</code>
Decode message attributes from SNS.

**Kind**: static method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>DecodedMessageAttributes</code> - Decoded message attributes.  

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>EncodedMessageAttributes</code> | Encoded message attributes. |

<a name="module_wrapped-sns-client.WrappedSnsClient.encodeMessageAttributes"></a>

#### WrappedSnsClient.encodeMessageAttributes(attributes) ⇒ <code>EncodedMessageAttributes</code>
Encode message attributes for SNS.

**Kind**: static method of [<code>WrappedSnsClient</code>](#module_wrapped-sns-client.WrappedSnsClient)  
**Returns**: <code>EncodedMessageAttributes</code> - Encoded message attributes.  

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>DecodedMessageAttributes</code> | Decoded message attributes. |

<a name="module_wrapped-sns-client..DecodedMessageAttributes"></a>

### wrapped-sns-client~DecodedMessageAttributes : <code>Object.&lt;string, (string\|number)&gt;</code>
**Kind**: inner typedef of [<code>wrapped-sns-client</code>](#module_wrapped-sns-client)  
<a name="module_wrapped-sns-client..EncodedMessageAttributes"></a>

### wrapped-sns-client~EncodedMessageAttributes : <code>Object.&lt;string, object&gt;</code>
**Kind**: inner typedef of [<code>wrapped-sns-client</code>](#module_wrapped-sns-client)  
<a name="module_wrapped-sns-client..GetEntityCallback"></a>

### wrapped-sns-client~GetEntityCallback ⇒ <code>string</code>
Extract entity token from index value.

**Kind**: inner typedef of [<code>wrapped-sns-client</code>](#module_wrapped-sns-client)  
**Returns**: <code>string</code> - Entity token.  

| Param | Type | Description |
| --- | --- | --- |
| indexValue | <code>string</code> | Index value. |


---

See more great templates and other tools on
[my GitHub Profile](https://github.com/karmaniverous)!
