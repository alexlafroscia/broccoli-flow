'use strict';

var readFile = require('fs').readFile;

var spawnSync = require('child_process').spawnSync;
var flow = require('flow-bin');

var FlowCheckFailure = require('./error').FlowCheckFailure;

/**
 * Read the contents of a file
 *
 * @param {string} fileName
 * @return {Promise}
 */
function readFileAsync(fileName) {
  if (typeof fileName !== 'string') {
    return Promise.reject(Error('File name is invalid'));
  }

  return new Promise(function(resolve, reject) {
    readFile(fileName, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function checkFileContents(content) {
  return new Promise(function(resolve, reject) {
    var result = spawnSync(flow, ['check-contents'], { input: content });

    if (result.status === 0) {
      resolve(result.stdout);
    } else {
      reject(new FlowCheckFailure(result.output.toString()));
    }
  });
}

function checkFile(fileName) {
  return readFileAsync(fileName)
    .then(function(content) {
      return checkFileContents(content);
    });
}

module.exports = {
  readFile: readFileAsync,
  checkFileContents: checkFileContents,
  checkFile: checkFile
};
