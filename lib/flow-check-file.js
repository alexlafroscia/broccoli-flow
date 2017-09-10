const spawnSync = require('child_process').spawnSync;
const flow = require('flow-bin');

/**
 * Run a flow check on the file contents
 *
 * @param {string} content the contents of a file to check
 * @return {string[]} the JSON error messages from Flow
 */
function checkFileContents(content, filePath) {
  const result = spawnSync(flow, ['check-contents', filePath, '--color', 'always'], {
    input: content
  });
  const outputText = result.output[1].toString();

  if (result.status !== 0) {
    return outputText;
  } else {
    return '';
  }
}

module.exports = checkFileContents;
