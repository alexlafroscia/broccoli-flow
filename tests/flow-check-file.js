const { describe, it } = require('mocha');
const { expect } = require('chai');

const checkFileContents = require('../lib/flow-check-file');

describe('flow check file contents', function() {
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
    const errors = checkFileContents(content);

    expect(errors).to.be.empty;
  });

  it('should error when the file content is invalid', function() {
    const content = `
      // @flow
      function length(x): string {
        return x.length;
      }

      length('Hellow, world!');
    `;
    const errors = checkFileContents(content);

    expect(errors).not.to.be.empty;
  });
});
