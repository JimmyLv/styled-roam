import { getGoogleDriveIframeLink } from '../providers/google-drive'
import { getOneDriveIframeLink } from '../providers/onedrive'
import { appendFileBlock } from '../roam'

export async function fileAdded(file) {
  console.log('file-added', file)

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
    })
    if (file.source === 'GoogleDrive') {
      const iframeLink = getGoogleDriveIframeLink(file)
      appendFileBlock(iframeLink)
    } else if (file.source === 'OneDrive') {
      const iframeLink = getOneDriveIframeLink(file)
      appendFileBlock(iframeLink)
    } else {
      appendFileBlock(`![${file.name || ''}](${file.preview})`)
    }
  } else {
    // const imageUrl = await uploadAsBase64(base64Image)
    const { endpoint, payload } = file.meta
    console.log('file-added format', { endpoint, payload })

    uppy.setFileState(file.id, {
      ...file,
      name: 'Roam Research' + '__' + file.name,
      // preview: URL.createObjectURL(file),
      xhrUpload: { endpoint },
      data: JSON.stringify({
        ...file.data,
        ...payload,
      }),
    })

    await uppy.upload()
  }
}
