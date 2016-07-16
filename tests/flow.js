var resolve = require('path').resolve;

var expect = require('chai').expect;

var flow = require('../lib/flow');
var checkFile = flow.checkFile;
var readFile = flow.readFile;
var checkFileContents = flow.checkFileContents;

var FlowCheckFailure = require('../lib/error').FlowCheckFailure;

describe('flow module', function() {
  describe('readFile', function() {
    it('should export the function', function() {
      expect(readFile).to.be.instanceof(Function);
    });
  });

  describe('checkFileContents', function() {
    it('should export the function', function() {
      expect(flow.checkFileContents).to.be.instanceof(Function);
    });
  });

  describe('checkFile', function() {
    describe('function parameters', function() {
      [
        { type: 'a number', value: 0 }, { type: 'undefined', value: undefined },
        { type: 'null', value: null },
        { type: 'an invalid path', value: 'foo.js' }
      ].forEach(function(data) {
        it('should reject when ' + data.type + ' is provided', function() {
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
        });
    });
  });
});
