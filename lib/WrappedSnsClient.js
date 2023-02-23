/**
 * @module wrapped-sns-client
 */

// npm imports
import clientSns from '@aws-sdk/client-sns';
const { SNS } = clientSns;

import _ from 'lodash';

const defaultClientConfig = { region: 'us-east-1' };

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
    this.#client = new SNS({
      ..._.omit(config, 'logger'),
      ...(logInternals ? { logger } : {}),
    });
  }
}
