import { config } from '../config';
import { saveToDropbox } from '../providers/dropbox';
import { appendFileBlock } from '../roam';

export function complete() {
  return (result) => {
    if (result.successful.length > 0) {
      console.log('result.successful', result.successful);

      const { response } = result.successful[0];
      console.log('successful[0] result response', response);

      const mdLink = `![](${response.uploadURL})`;
      appendFileBlock(mdLink);

      if (config.dropbox_app_key) {
        saveToDropbox(response.uploadURL);
      }
    }
    if (result.failed.length > 0) {
      console.log('failed files:', result.failed);
      console.error('Errors:');
      result.failed.forEach((file) => {
        console.error(file.error);
      });
    }
  };
}
