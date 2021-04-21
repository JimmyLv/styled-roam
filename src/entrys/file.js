import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Facebook from '@uppy/facebook'
import ImageEditor from '@uppy/image-editor'
import OneDrive from '@uppy/onedrive'
import XHRUpload from '@uppy/xhr-upload'
// import Dropins from 'dropbox-dropins'
import { Dropbox, DropTarget, GoogleDrive, Instagram, ProgressBar, ScreenCapture, Transloadit, Webcam } from 'uppy'
import 'uppy/dist/uppy.min.css'
import { appendCSSToPageByEnv, appendIcon } from '../utils/dom-helper'
import { blobToBase64 } from './base64'
import { config } from './config'
import { saveToDropbox } from './dropbox'
import { formatBase64Payload } from './github'
import { appendFileBlock } from './roam'

appendCSSToPageByEnv('cssFileUploader', 'file.css')

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

const companionOptions = {
  target: Dashboard,
  companionUrl: Transloadit.COMPANION,
  companionAllowedHosts: Transloadit.COMPANION_PATTERN,
}

// <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="dsug98rvaux3fit"></script>

if (config.dropbox_app_key) {
  var existing = document.getElementById('dropboxjs')
  if (!existing) {
    var extension = document.createElement('script')
    extension.src = 'https://www.dropbox.com/static/api/2/dropins.js'
    extension.id = 'dropboxjs'
    extension.dataset.appKey = config.dropbox_app_key
    extension.async = true
    extension.type = 'text/javascript'
    document.getElementsByTagName('head')[0].appendChild(extension)
  }
}

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
  /*.use(Transloadit, {
    importFromUploadURLs: true,
    alwaysRunAssembly: false,
    waitForEncoding: false,
    params: {
      auth: {
        key: config.companion_auth_key,
      },
      steps: {
        ':original': {
          robot: '/upload/handle',
        },
        compress_image: {
          use: ':original',
          robot: '/image/optimize',
          progressive: true,
        },
        export: {
          use: ['compress_image'],
          robot: '/file/serve',
        },
      },
      // https://transloadit.com/c/
    },
  })*/
  .use(Dropbox, companionOptions)
  .use(GoogleDrive, companionOptions)
  .use(Instagram, companionOptions)
  .use(Facebook, companionOptions)
  .use(OneDrive, companionOptions)
  .use(Webcam, { target: Dashboard })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: 'document.body' })
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
      authorization: `token ${config.token}`,
    },
    getResponseData(responseText, response) {
      const res = JSON.parse(responseText)
      console.log('XHRUpload response', res)

      if (res.message) {
        alert(`GitHub Error Message: ${res.message}`)
        uppy.info(res.message, 'error', 3000)
      }
      return {
        url: res.content.download_url,
        preview: res.content.download_url,
        data: res.content,
      }
    },
  })
  .on('file-added', async (file) => {
    console.log('file-added', file)
    const image = file.data

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
        const type =
          {
            // https://docs.google.com/presentation/d/1l5l4ctSUt3rBtojprP60HCLarS7jryZArY-5mAlBm_g/edit
            ppt: 'presentation',
            // https://docs.google.com/spreadsheets/d/0BwLlItXN6SRuWHlpakdpS2ltdHM/edit
            xlsx: 'spreadsheets',
            csv: 'spreadsheets',
            // https://docs.google.com/document/d/0BwLlItXN6SRuRDdBOFR0TExDbHc/edit
            docx: 'document',
            doc: 'document',
            // https://docs.google.com/drawings/d/1sMeeh3GZgVG2xUY5fxmhQA7meHjzDJEaDam-xRWA5Dw/edit
            pdf: 'download',
          }[file.extension] || 'file'

        if (type === 'file') {
          if (file.id.includes('drawing')) {
            //.png
            appendFileBlock(`{{iframe: https://docs.google.com/drawings/d/${file.data.id}/edit}}`)
          } else if (file.type === 'image/jpeg') {
            // images
            const imageUrl = file.preview.replace('=s220', '')
            appendFileBlock(`![${file.name}](${imageUrl})`)
          } else {
            appendFileBlock(`{{iframe: https://docs.google.com/${type}/d/${file.data.id}/edit}}`)
          }
        } else if (type === 'download') {
          appendFileBlock(`{{pdf: https://docs.google.com/file/d/${file.data.id}/preview}}`)
        } else {
          appendFileBlock(`{{iframe: https://docs.google.com/${type}/d/${file.data.id}/edit}}`)
        }
      } else if (file.source === 'OneDrive') {
        const type =
          {
            // https://onedrive.live.com/edit.aspx?page=view&resid=879869B902DC45E2!1098&app=PowerPoint
            ppt: 'PowerPoint',
            // https://onedrive.live.com/edit.aspx?page=view&resid=879869B902DC45E2!1109&app=Excel
            xlsx: 'Excel',
            csv: 'Excel',
            // https://onedrive.live.com/edit.aspx?page=view&resid=879869B902DC45E2!1113&app=Word
            docx: 'Word',
            doc: 'Word',
            // https://onedrive.live.com/pdf?resid=879869B902DC45E2%211092&open=1&serve=1
            pdf: 'PDF',
          }[file.extension] || 'file'

        if (type === 'file') {
          appendFileBlock(`![${file.name}](${file.preview})`)
        } else if (type === 'PDF') {
          appendFileBlock(`{{iframe: https://onedrive.live.com/pdf?resid=${file.data.id}&open=1&serve=1}}`)
        } else {
          appendFileBlock(`{{iframe: https://onedrive.live.com/edit.aspx?page=view&resid=${file.data.id}&app=${type}}}`)
        }
      } else {
        appendFileBlock(`![${file.name || ''}](${file.preview})`)
      }
    } else {
      const base64Image = await blobToBase64(image)
      // const imageUrl = await uploadAsBase64(base64Image)
      const { endpoint, payload } = formatBase64Payload(base64Image)
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
  })
  .on('upload', ({ id, fileIDs }) => {
    // data object consists of `id` with upload ID and `fileIDs` array
    // with file IDs in current upload
    console.log(`Starting upload ${id} for files ${fileIDs}`)
  })
  .on('upload-success', (file, response) => {
    console.log('upload-success', file, response.uploadURL)
  })
  .on('complete', (result) => {
    if (result.successful.length > 0) {
      console.log('result.successful', result.successful)

      const { response } = result.successful[0]
      console.log('successful[0] result response', response)

      // if (response.uploadURL.endsWith('png')) {
      const mdLink = `![](${response.uploadURL})`
      appendFileBlock(mdLink)
      /*} else {
        updateActiveBlock(`{{iframe: ${response.uploadURL} }}`)
      }*/
      if (config.dropbox_app_key) {
        saveToDropbox(response.uploadURL)
      }
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
  if (image) {
    // only handle for image files
    event.stopPropagation()
    event.preventDefault()

    try {
      uppy.addFile({
        source: 'image from clipboard',
        name: image.name,
        type: image.type,
        data: image,
        preview: URL.createObjectURL(image),
      })
      // await uppy.upload()
    } catch (e) {
      console.error(e, 'xxxxxxxxxxxx')
    }
  }
}

document.getElementById('app').removeEventListener('onpaste', interceptImagePaste)
document.getElementById('app').onpaste = interceptImagePaste
