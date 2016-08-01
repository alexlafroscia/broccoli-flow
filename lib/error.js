/**
 * An error class to represent a Flow check failure
 */
export function FlowCheckFailure(errorInformation) {
  this.name = 'FlowCheckFailure';
  this.message = 'Flow check of file failed';
  this.contents = errorInformation;
}

FlowCheckFailure.prototype = Error.prototype;
