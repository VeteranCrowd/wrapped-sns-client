/* eslint-env mocha */

// mocha imports
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
use(chaiAsPromised);

// npm imports
import { nanoid } from 'nanoid';

// lib imports
import { WrappedSnsClient } from './WrappedSnsClient.js';

let wrappedSnsClient;

describe('WrappedSnsClient', function () {
  before(function () {
    wrappedSnsClient = new WrappedSnsClient();
  });

  describe('constructor', function () {
    it('should create a WrappedSnsClient instance', function () {
      expect(wrappedSnsClient).to.be.an.instanceof(WrappedSnsClient);
    });
  });

  describe('encodeMessageAttributes', function () {
    it('should return encoded attributes', function () {
      const messageAttributes = { foo: 'bar', baz: 123 };

      expect(
        WrappedSnsClient.encodeMessageAttributes(messageAttributes)
      ).to.deep.equal({
        foo: { DataType: 'String', StringValue: 'bar' },
        baz: { DataType: 'Number', StringValue: '123' },
      });
    });

    it('should support undefined input', function () {
      expect(WrappedSnsClient.encodeMessageAttributes()).to.deep.equal({});
    });
  });

  describe('decodeMessageAttributes', function () {
    it('should return encoded attributes', function () {
      const messageAttributes = {
        foo: { DataType: 'String', StringValue: 'bar' },
        baz: { DataType: 'Number', StringValue: '123' },
      };

      expect(
        WrappedSnsClient.decodeMessageAttributes(messageAttributes)
      ).to.deep.equal({ foo: 'bar', baz: 123 });
    });

    it('should support undefined input', function () {
      expect(WrappedSnsClient.decodeMessageAttributes()).to.deep.equal({});
    });
  });

  describe('create/delete topic', function () {
    let topicName;
    let topicArn;

    describe('validations', function () {
      it('should close', async function () {
        topicName = nanoid();
        topicArn = await wrappedSnsClient.createTopic(topicName);
        const { TopicArn } = await wrappedSnsClient.getTopicAttributes(
          topicArn
        );
        expect(TopicArn).to.equal(topicArn);

        await wrappedSnsClient.deleteTopic(topicArn);
        expect(
          wrappedSnsClient.getTopicAttributes(topicArn)
        ).to.eventually.throw();
      });
    });

    describe('createTopic ... deleteTopic', function () {
      before(async function () {
        topicName = nanoid();
        topicArn = await wrappedSnsClient.createTopic(topicName);
      });

      after(async function () {
        await wrappedSnsClient.deleteTopic(topicArn);
      });

      describe('getTopicAttributes', function () {
        it('should return topicArn', async function () {
          const { TopicArn } = await wrappedSnsClient.getTopicAttributes(
            topicArn
          );

          expect(TopicArn).to.equal(TopicArn);
        });
      });

      describe('publish', function () {
        it('should return messageId', async function () {
          const messageId = await wrappedSnsClient.publish({
            message: 'foo',
            topicArn,
          });

          expect(messageId).to.be.a.string;
        });
      });
    });
  });
});
