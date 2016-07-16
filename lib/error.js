/**
 * An error class to represent a Flow check failure
 */
export function FlowCheckFailure(fileContents) {
  this.name = 'FlowCheckFailure';
  this.message = 'Flow check of file failed';
  this.contents = fileContents;
}

FlowCheckFailure.prototype = Error.prototype;
