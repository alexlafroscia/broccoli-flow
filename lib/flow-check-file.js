import { spawnSync } from 'child_process';
import flow from 'flow-bin';

/**
 * Parse the JSON errors from Flow
 *
 * Trims off the leading and trailing commas, if they exist (and for some reason, they do)
 *
 * @param {string} content the error content from Flow
 * @return {obj} the parsed error content
 */
function parseFlowOutput(content) {
  const openBracketIndex = content.indexOf('{');
  const closeBracketIndex = content.lastIndexOf('}');

  content = content.substring(openBracketIndex, closeBracketIndex + 1);

  return JSON.parse(content);
}

/**
 * Run a flow check on the file contents
 *
 * @param {string} content the contents of a file to check
 * @return {string[]} the JSON error messages from Flow
 */
export default function checkFileContents(content) {
  const result = spawnSync(flow, ['check-contents', '--json'], { input: content });
  const outputText = result.output.toString();
  const parsedOutput = parseFlowOutput(outputText);

  return parsedOutput.errors;
}
