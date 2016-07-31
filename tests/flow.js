import { resolve } from 'path';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { checkFile, checkFileContents, readFile } from '../lib/flow';
import { FlowCheckFailure } from '../lib/error';

describe('flow module', function() {
  describe('readFile', function() {
    it('should export the function', function() {
      expect(readFile).to.be.instanceof(Function);
    });

    it('resolves with the content of a file', function() {
      return readFile(`${__dirname}/input/read-file.js`)
        .then(function(data) {
          expect(data.trim()).to.equal('var foo = "bar";');
        });
    });

    it('rejects when the file doesn\'t exist', function() {
      return readFile(`${__dirname}/input/non-existant-file.js`)
        .catch(function(error) {
          expect(error).to.be.instanceof(Error);
        });
    });
  });

  describe('checkFileContents', function() {
    it('should export the function', function() {
      expect(checkFileContents).to.be.instanceof(Function);
    });

    it('should check the given content', function() {
      const content = `
        // @flow
        function length(x): number {
          return x.length;
        }

        length('Hellow, world!');
      `;
      return checkFileContents(content)
        .then(function(data) {
          expect(data.trim()).to.equal('No errors!');
        });
    });

    it('should error when the file content is invalid', function() {
      const content = `
        // @flow
        function length(x): string {
          return x.length;
        }

        length('Hellow, world!');
      `;
      return checkFileContents(content)
        .catch(function(error) {
          expect(error).to.be.instanceof(FlowCheckFailure);
        });
    });
  });

  describe('checkFile', function() {
    describe('function parameters', function() {
      [
        { type: 'a number', value: 0 },
        { type: 'undefined', value: undefined },
        { type: 'null', value: null },
        { type: 'an invalid path', value: 'foo.js' }
      ].forEach(function(data) {
        it(`should reject when ${data.type} is provided`, function() {
          return checkFile(data.value)
            .catch(function(error) {
              expect(error).instanceof(Error);
            })
            .then(function(fileName) {
              expect(fileName).not.to.be.ok;
            });
        });
      });
    });

    it('should resolve if the file passes the check', function() {
      return checkFile(resolve(__dirname, './input/valid.js'));
    });

    it('should reject if the file did not pass a check', function() {
      return checkFile(resolve(__dirname, './input/invalid.js'))
        .catch(function(error) {
          expect(error).to.be.instanceof(FlowCheckFailure);
          expect(error).to.be.instanceof(Error);
        });
    });
  });
});
