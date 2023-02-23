/* eslint-env mocha */

// mocha imports
import chai from 'chai';
const expect = chai.expect;

// lib imports
import { WrappedSnsClient } from './WrappedSnsClient.js';

describe('WrappedSnsClient', function () {
  describe('constructor', function () {
    it('should create a WrappedSnsClient instance', function () {
      const wrappedSnsClient = new WrappedSnsClient();
      expect(wrappedSnsClient).to.be.an.instanceof(WrappedSnsClient);
    });
  });
});
