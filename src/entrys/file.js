import Facebook from '@uppy/facebook'
import ImageEditor from '@uppy/image-editor'
import OneDrive from '@uppy/onedrive'
import {
  Core as Uppy,
  Dashboard,
  Dropbox,
  DropTarget,
  GoogleDrive,
  Instagram,
  ProgressBar,
  ScreenCapture,
  Webcam,
  XHRUpload,
} from 'uppy'
import 'uppy/dist/uppy.min.css'
import { appendCSSToPageByEnv, appendIcon } from '../utils/dom-helper'
import { companionOptions, config } from './config'
import { interceptImageDrop } from './handlers/drag-drop'
import { interceptImagePaste } from './handlers/paste'
import { loadDropboxScript } from './providers/dropbox'
import { complete } from './uppy/complete'
import { fileAdded } from './uppy/file-added'
import { upload } from './uppy/upload'
import { uploadSuccess } from './uppy/upload-success'

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

// <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="dsug98rvaux3fit"></script>

if (config.dropbox_app_key) {
  loadDropboxScript()
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
  .on('file-added', fileAdded)
  .on('upload', upload)
  .on('upload-success', uploadSuccess)
  .on('complete', complete)

window.uppy = uppy

document.getElementById('app').removeEventListener('onpaste', interceptImagePaste)
document.getElementById('app').onpaste = interceptImagePaste

document.getElementById('app').removeEventListener('ondrop', interceptImageDrop)
document.getElementById('app').ondrop = interceptImageDrop
