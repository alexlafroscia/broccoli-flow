var resolve = require('path').resolve;

var expect = require('chai').expect;
var flow = require('../lib/flow');

describe('flow module', function() {
  it('should export the `readFile` function', function() {
    expect(flow.readFile).to.be.instanceof(Function);
  });

  it('should export the `checkFileContents` function', function() {
    expect(flow.checkFileContents).to.be.instanceof(Function);
  });

  describe('file checking function', function() {
    describe('function parameters', function() {
      [
        { type: 'a number', value: 0 }, { type: 'undefined', value: undefined },
        { type: 'null', value: null },
        { type: 'an invalid path', value: 'foo.js' }
      ].forEach(function(data) {
        it('should reject when ' + data.type + ' is provided', function() {
          return flow(data.value)
            .catch(function(error) {
              expect(error).instanceof(Error);
            })
            .then(function(fileName) {
              expect(fileName).not.to.be.ok;
            });
        });
      });

      it('should resolve if the file passes the check', function() {
        return flow(resolve(__dirname, './input/valid.js'));
      });

      it('should reject if the file did not pass a check', function() {
        return flow(resolve(__dirname, './input/invalid.js'))
          .catch(function(output) {
            expect(output).to.be.instanceof(Error);
          });
      });
    });
  });
});
