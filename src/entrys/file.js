import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import XHRUpload from '@uppy/xhr-upload';
import { updateActiveBlock } from 'roam-client';
import { ProgressBar } from 'uppy';
import 'uppy/dist/uppy.min.css';
import { appendCSSToPageByEnv, appendIcon } from '../utils/dom-helper';
import { blobToBase64 } from './base64';
import { formatBase64Payload } from './github';

appendCSSToPageByEnv('cssFileUploader', 'http://localhost:8080/file.css')

appendIcon('file-upload', 'cloud-upload', function () {
  const dashboard = window.uppy.getPlugin('Dashboard')
  if (dashboard.isModalOpen()) {
    dashboard.closeModal()
    console.log('cloud-upload, dashboard close')
  } else {
    dashboard.openModal()
    console.log('cloud-upload, dashboard open')
  }
})

var uppy = new Uppy({
  id: 'uppy',
  debug: true,
})
  .use(Dashboard, {
    // inline: true,
    trigger: '#mode-button-file-upload',
    target: 'body',
  })
  .use(ProgressBar, {
    target: 'body',
    fixed: true,
  })
  /*.use(GoogleDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Dropbox, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Instagram, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Facebook, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(OneDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Webcam, { target: Dashboard })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })*/
  // .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  .use(XHRUpload, {
    // endpoint: 'https://xhr-server.herokuapp.com/upload',
    // endpoint: 'https://sm.ms/api/v2/upload',
    endpoint: 'https://api.github.com',
    method: 'put',
    formData: false,
    // fieldName: 'files[]',
    // metaFields: null
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'token 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',
    },
    getResponseData(responseText, response) {
      const res = JSON.parse(responseText)
      console.log('XHRUpload response', res)

      return {
        url: res.content.download_url,
        preview: res.content.download_url,
        data: res.content,
      }
    },
  })
  .on('file-added', async (file) => {
    const image = file.data
    const base64Image = await blobToBase64(image)
    // const imageUrl = await uploadAsBase64(base64Image)
    const { endpoint, payload } = formatBase64Payload(base64Image)
    console.log('file-added', file, { endpoint, payload })

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
  })
  .on('upload', ({ id, fileIDs }) => {
    // data object consists of `id` with upload ID and `fileIDs` array
    // with file IDs in current upload
    console.log(`Starting upload ${id} for files ${fileIDs}`)
  })
  .on('complete', (result) => {
    if (result.successful.length > 0) {
      console.log('result.successful', result.successful)

      const { type, response } = result.successful[0]
      console.log('successful[0] result response', response)

      // if (response.uploadURL.endsWith('png')) {
      updateActiveBlock(`![](${response.uploadURL})`)
      /*} else {
        updateActiveBlock(`{{iframe: ${response.uploadURL} }}`)
      }*/
    }
    if (result.failed.length > 0) {
      console.log('failed files:', result.failed)
      console.error('Errors:')
      result.failed.forEach((file) => {
        console.error(file.error)
      })
    }
  })

window.uppy = uppy

const interceptImagePaste = async (event) => {
  event.stopPropagation()
  event.preventDefault()

  const items = event.clipboardData && event.clipboardData.items
  var image = null
  if (items && items.length) {
    // 检索剪切板items
    for (let i = 0; i < items.length; i++) {
      console.log(`event.clipboardData items[${i}]`, items[i])
      if (items[i].type.includes('image') || items[i].type.includes('pdf')) {
        image = items[i].getAsFile()
        break
      }
    }
  }

  // 此时file就是剪切板中的图片文件
  try {
    uppy.addFile({ source: 'image from clipboard', data: image })
    // await uppy.upload()
  } catch (e) {
    console.error(e, 'xxxxxxxxxxxx')
  }

  //todo: throw text clipboard event
}

document.getElementById('app').removeEventListener('onpaste', interceptImagePaste)
document.getElementById('app').onpaste = interceptImagePaste
