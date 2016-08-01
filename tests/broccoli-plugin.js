import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

import { describe, it } from 'mocha';
import { expect } from 'chai';

import { Builder } from 'broccoli';
import Funnel from 'broccoli-funnel';
import FlowFilter from '../lib';

function runFlowOnFile(fixtureFileName, printErrors = false) {
  const tree = new Funnel(`${__dirname}/input`, {
    files: [fixtureFileName],
    destDir: 'output'
  });
  return new FlowFilter(tree, { printErrors });
}

describe('broccoli plugin', function() {
  it('checks the contents of a valid file', function() {
    const tree = runFlowOnFile('valid.js');
    const builder = new Builder(tree);

    return builder.build().then(function({ directory }) {
      const outputFileContent = readFileSync(join(directory, 'output/valid.js')).toString();
      const sourceFileContent = readFileSync(join(__dirname, 'input/valid.js')).toString();

      expect(outputFileContent).to.equal(sourceFileContent);
    });
  });

  it.only('checks the contents of an invalid file', function() {
    const tree = runFlowOnFile('invalid.js');
    const builder = new Builder(tree);

    return builder.build()
      .catch(function({ treeDir }) {
        expect(existsSync(join(treeDir, 'output/invalid.js'))).not.to.be.ok;
      });
  });
});
