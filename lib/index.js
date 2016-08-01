import PersistentFilter from 'broccoli-persistent-filter';

import { checkFileContents } from './flow';

export default class FlowFilter extends PersistentFilter {
  get extensions() {
    return ['js'];
  }

  get targetExtension() {
    return 'js';
  }

  processString(content) {
    return checkFileContents(content).finally(function(error) {
      if (error) {
        console.log(error.contents);
      }

      // Do something to get the errors from Flow and attach
      // them to the output

      return {
        output: content
      };
    });
  }

  postProcess(fromCache) {
    const { output } = fromCache;

    // Do something to print the errors from Flow

    return { output };
  }
}
