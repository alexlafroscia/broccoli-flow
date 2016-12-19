const spawnSync = require('child_process').spawnSync;
const flow = require('flow-bin');

/**
 * Run a flow check on the file contents
 *
 * @param {string} content the contents of a file to check
 * @return {string[]} the JSON error messages from Flow
 */
function checkFileContents(content) {
  const result = spawnSync(flow, ['check-contents'], { input: content });
  const outputText = result.output.toString();

  if (result.status !== 0) {
    return outputText;
  } else {
    return '';
  }
}

module.exports = checkFileContents;