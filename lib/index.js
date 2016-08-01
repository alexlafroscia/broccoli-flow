import PersistentFilter from 'broccoli-persistent-filter';

import checkFileContents from './flow-check-file';

export default class FlowFilter extends PersistentFilter {
  constructor(inputNode, options = {}) {
    super(inputNode, options);

    this.printErrors = options.printErrors || false;
  }

  get extensions() {
    return ['js'];
  }

  get targetExtension() {
    return 'js';
  }

  processString(fileContent) {
    const errorText = checkFileContents(fileContent);

    return {
      output: fileContent,
      errors: errorText
    };
  }

  postProcess({ output, errors }) {
    if (this.printErrors) {
      console.log(errors);
    }

    if (errors.length > 0) {
      throw new Error('Flow check failed');
    }

    return { output };
  }
}
