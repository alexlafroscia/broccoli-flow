import { describe, it } from 'mocha';
import { expect } from 'chai';

import { Builder } from 'broccoli';
import Funnel from 'broccoli-funnel';

import FlowFilter from '../lib';
import { FlowCheckFailure } from '../lib/error';

function runFlowOnFile(fixtureFileName) {
  const tree = new Funnel(`${__dirname}/input`, {
    include: [fixtureFileName],
    destDir: 'output'
  });
  return new FlowFilter(tree);
}

describe('broccoli plugin', function() {
  it('checks the contents of a valid file', function() {
    const tree = runFlowOnFile('valid.js');
    const builder = new Builder(tree);

    return builder.build();
  });

  it('checks the contents of an invalid file', function() {
    const tree = runFlowOnFile('invalid.js');
    const builder = new Builder(tree);

    return builder.build().catch(function(error) {
      expect(error).to.be.an.instanceof(FlowCheckFailure);
    });
  });
});
