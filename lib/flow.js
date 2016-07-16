import { readFile as readFileAsync } from 'fs';
import { spawnSync } from 'child_process';

import { Promise, reject } from 'RSVP';

import flow from 'flow-bin';
import { FlowCheckFailure } from './error';

/**
 * Read the contents of a file
 *
 * @param {string} fileName
 * @return {Promise}
 */
export function readFile(fileName) {
  if (typeof fileName !== 'string') {
    return reject(Error('File name is invalid'));
  }

  return new Promise(function(res, rej) {
    readFileAsync(fileName, 'utf8', function(err, data) {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

/**
 * Run a flow check on the file contents
 *
 * @param {string} content the contents of a file to check
 * @return {Promise} whether or not the check was successful
 */
export function checkFileContents(content) {
  return new Promise(function(res, rej) {
    var result = spawnSync(flow, ['check-contents'], { input: content });

    if (result.status === 0) {
      res(result.stdout);
    } else {
      rej(new FlowCheckFailure(result.output.toString()));
    }
  });
}

/**
 * Run a Flow check on the specified file
 *
 * @param {string} fileName
 * @return {Promise} whether or not the check was successful
 */
export function checkFile(fileName) {
  return readFile(fileName).then((content) => checkFileContents(content));
}
