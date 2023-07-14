/**
 * @module wrapped-sns-client
 */

// npm imports
import AWSXray from 'aws-xray-sdk';
import clientSns from '@aws-sdk/client-sns';
const { SNS } = clientSns;

import _ from 'lodash';

const defaultClientConfig = { region: 'us-east-1' };

/**
 * @typedef {Object<string, string|number>} DecodedMessageAttributes
 */

/**
 * @typedef {Object<string, object>} EncodedMessageAttributes
 */

/**
 * Wraps an AWS SNS client to provide standard logging & services.
 */
export class WrappedSnsClient {
  #client;
  #logger;

  /**
   * WrappedSnsClient constructor.
   *
   * @param {object} [options] - Options.
   * @param {object} [options.logger] - Logger instance (default is {@link https://nodejs.org/api/console.html#class-console global console object}). Must have info, error & debug methods
   * @param {boolean} [options.logInternals] - Log AWS client internals (default is false).
   * @param {object} [options.config] - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/snsclientconfig.html SNSClientConfig}.
   */
  constructor({
    config = defaultClientConfig,
    logger = console,
    logInternals = false,
  } = {}) {
    // Validate options.
    if (!logger.info || !logger.error || !logger.debug)
      throw new Error('logger must have info, error & debug methods');

    // Set state.
    this.#logger = logger;

    const sns = new SNS({
      ..._.omit(config, 'logger'),
      ...(logInternals ? { logger } : {}),
    });

    this.#client =
      process.env.AWS_XRAY_DAEMON_ADDRESS
        ? AWSXray.captureAWSv3Client(sns)
        : sns;
  }

  /**
   * Decode message attributes from SNS.
   *
   * @param {EncodedMessageAttributes} attributes - Encoded message attributes.
   * @return {DecodedMessageAttributes} Decoded message attributes.
   */
  static decodeMessageAttributes(attributes = {}) {
    return _.mapValues(
      attributes,
      ({ DataType, dataType, StringValue, stringValue }) => {
        const theDataType = DataType ?? dataType;
        const theStringValue = StringValue ?? stringValue;

        switch (theDataType) {
          case 'String':
            return theStringValue;
          case 'Number':
            return Number(theStringValue);
          default:
            throw new Error(`unsupported attribute value type: ${theDataType}`);
        }
      }
    );
  }

  /**
   * Encode message attributes for SNS.
   *
   * @param {DecodedMessageAttributes} attributes - Decoded message attributes.
   * @return {EncodedMessageAttributes} Encoded message attributes.
   */
  static encodeMessageAttributes(attributes = {}) {
    return _.mapValues(
      _.pickBy(attributes, (attribute) => !_.isUndefined(attribute)),
      (attribute) => ({
        DataType: _.isString(attribute)
          ? 'String'
          : _.isNumber(attribute)
          ? 'Number'
          : (() => {
              throw new Error(
                `unsupported attribute value type: ${typeof attribute}`
              );
            })(),
        StringValue: attribute.toString(),
      })
    );
  }

  /**
   * Create SNS topic.
   *
   * @param {string} topicName - Topic name.
   * @param {object} [attributes] - Topic attributes (see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/createtopiccommandinput.html#attributes reference}).
   * @return {Promise<string>} Topic ARN.
   */
  async createTopic(topicName, attributes = {}) {
    // Validate parameters.
    if (!_.isString(topicName) || !topicName.length)
      throw new Error('invalid topicName');
    if (!_.isPlainObject(attributes)) throw new Error('invalid attributes');

    // Send command.
    this.#logger.info(`Creating topic '${topicName}'...`);
    const response = await this.#client.createTopic({
      Name: topicName,
      Attributes: attributes,
    });
    this.#logger.info(`Created topic '${topicName}'.`);
    this.#logger.debug(response);

    return response.TopicArn;
  }

  /**
   * Delete SNS topic.
   *
   * @param {string} topicArn - Topic ARN.
   * @return {Promise<boolean>} True if successful.
   */
  async deleteTopic(topicArn) {
    // Validate parameters.
    if (!_.isString(topicArn) || !topicArn.length)
      throw new Error('invalid topicArn');

    // Send command.
    this.#logger.info(`Deleting topic ARN ${topicArn}...`);
    const response = await this.#client.deleteTopic({ TopicArn: topicArn });
    this.#logger.info(`Deleted topic ARN ${topicArn}.`);
    this.#logger.debug(response);

    return true;
  }

  /**
   * Get SNS topic attributes.
   *
   * @param {string} topicArn - Topic ARN.
   * @return {Promise<object>} Topic attributes.
   */
  async getTopicAttributes(topicArn) {
    // Validate parameters.
    if (!_.isString(topicArn) || !topicArn.length)
      throw new Error('invalid topicArn');

    // Send command.
    this.#logger.debug(`Getting attributes for topic ARN ${topicArn}...`);
    const response = await this.#client.getTopicAttributes({
      TopicArn: topicArn,
    });
    this.#logger.debug(`Got attributes for topic ${topicArn}.`, response);

    return response.Attributes;
  }

  /**
   * Publish message to SNS.
   *
   * @param {object} options - Publish options.
   * @param {DecodedMessageAttributes} [options.attributes] - {@link DecodedMessageAttributes Message attributes.}
   * @param {object|string} options.message - Message content.
   * @param {object} [options.messageStructure] - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#messagestructure Message structure}.
   * @param {object} [options.phoneNumber] - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#phonenumber Phone number}.
   * @param {string} [options.subject] - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#subject Subject}
   * @param {string} [options.targetArn] - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#targetarn Target ARN}
   * @param {string} [options.topicArn] - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#topicarn Topic ARN}
   * @return {Promise<string>} Message ID.
   */
  async publish({
    attributes,
    message,
    messageStructure,
    phoneNumber,
    subject,
    targetArn,
    topicArn,
  }) {
    // Validate parameters.
    if (!_.isString(message) && !_.isPlainObject(message))
      throw new Error('invalid message');
    if (!_.isUndefined(messageStructure) && !_.isPlainObject(messageStructure))
      throw new Error('invalid messageStructure');
    if (!_.isUndefined(phoneNumber) && !_.isString(phoneNumber))
      throw new Error('invalid phoneNumber');
    if (!_.isUndefined(subject) && !_.isString(subject))
      throw new Error('invalid subject');
    if (!_.isUndefined(targetArn) && !_.isString(targetArn))
      throw new Error('invalid targetArn');
    if (!_.isUndefined(topicArn) && !_.isString(topicArn))
      throw new Error('invalid topicArn');

    // Send command.
    const options = {
      Message: _.isString(message) ? message : JSON.stringify(message),
      MessageAttributes: this.constructor.encodeMessageAttributes(attributes),
      MessageStructure: messageStructure,
      PhoneNumber: phoneNumber,
      Subject: subject,
      TargetArn: targetArn,
      TopicArn: topicArn,
    };
    this.#logger.debug(
      `Publishing message to topic ARN ${topicArn}...`,
      options
    );

    const response = await this.#client.publish(options);
    this.#logger.debug('Published message.', response);

    return response.MessageId;
  }

  /**
   * Extract entity token from index value.
   *
   * @callback GetEntityCallback
   * @param {string} indexValue - Index value.
   * @return {string} Entity token.
   */

  /**
   * Generate a DynamoDB Streams CRUD Operation Lambda event handler.
   *
   * @param {string} topicArn - {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/interfaces/publishcommandinput.html#topicarn Topic ARN}
   * @param {string} [indexToken] - Index token.
   * @param {GetEntityCallback} [getEntity] - get entity callback.
   * @return {Function} Event handler.
   */
  crudOperationHandler(
    topicArn,
    indexToken,
    getEntity = (indexValue) => indexValue
  ) {
    const publishMessage = async (message) => {
      // Extract attributes.
      if (indexToken) {
        const index = message.dynamodb?.NewImage?.[indexToken]?.S;
        var entity = index ? getEntity(index) : index;
      }

      const operation = message.eventName.toLowerCase();

      this.#logger.debug('Publishing message:', { message, entity, operation });

      // Publish message to SNS topic.
      await this.publish({
        attributes: {
          ...(entity ? { entity } : {}),
          ...(operation ? { operation } : {}),
        },
        message,
        topicArn,
      });
    };

    return async function (event) {
      for (const record of event.Records) {
        if (record.eventSource === 'aws:sqs')
          for (const innerRecord of JSON.parse(record.body).event.Records)
            await publishMessage(JSON.parse(innerRecord.Sns.Message));
        else await publishMessage(record);
      }
    };
  }
}
