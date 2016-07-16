'use strict';

function FlowCheckFailure(fileContents) {
  this.name = 'FlowCheckFailure';
  this.message = 'Flow check of file failed';
  this.contents = fileContents;
}

FlowCheckFailure.prototype = Error.prototype;

module.exports.FlowCheckFailure = FlowCheckFailure;
