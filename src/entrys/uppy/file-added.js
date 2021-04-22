import { blobToBase64 } from '../base64';
import { formatBase64Payload } from '../providers/github';
import { getGoogleDriveIframeLink } from '../providers/google-drive';
import { getOneDriveIframeLink } from '../providers/onedrive';
import { appendFileBlock } from '../roam';

export function fileAdded() {
  return async (file) => {
    console.log('file-added', file);
    const image = file.data;

    if (file.isRemote) {
      uppy.setFileState(file.id, {
        ...file,
        // fake data
        progress: {
          bytesTotal: 677375,
          bytesUploaded: 677375,
          percentage: 100,
          postprocess: null,
          uploadComplete: true,
          uploadStarted: 1619027556863,
        },
      });
      if (file.source === 'GoogleDrive') {
        const iframeLink = getGoogleDriveIframeLink(file);
        appendFileBlock(iframeLink);
      } else if (file.source === 'OneDrive') {
        const iframeLink = getOneDriveIframeLink(file);
        appendFileBlock(iframeLink);
      } else {
        appendFileBlock(`![${file.name || ''}](${file.preview})`);
      }
    } else {
      const base64Image = await blobToBase64(image);
      // const imageUrl = await uploadAsBase64(base64Image)
      const { endpoint, payload } = formatBase64Payload(base64Image);
      console.log('file-added format', { endpoint, payload });

      uppy.setFileState(file.id, {
        ...file,
        name: 'Roam Research' + '__' + file.name,
        // preview: URL.createObjectURL(file),
        xhrUpload: { endpoint },
        data: JSON.stringify({
          ...file.data,
          ...payload,
        }),
      });

      await uppy.upload();
    }
  };
}
