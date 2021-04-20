// And their styles (for UI plugins)
// With webpack and `style-loader`, you can require them like this:
// import '@uppy/core/dist/style.css';
// import '@uppy/dashboard/dist/style.css';
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.min.css'
import Uppy, { Dashboard, Tus } from 'uppy'

function appendCSSToPage(tagId, cssToAdd) {
  appendElementToPage(
    Object.assign(document.createElement('link'), {
      href: cssToAdd,
      rel: 'stylesheet',
    }),
    tagId,
    'text/css',
  )
}

function appendElementToPage(element, tagId, typeT) {
  try {
    document.getElementById(tagId).remove()
  } catch (e) {} //Delete any existing reference
  Object.assign(element, { type: typeT, async: false, tagId: tagId })
  document.getElementsByTagName('head')[0].appendChild(element)
}

appendCSSToPage('cssCalendar', 'http://localhost:8080/file.css')

FilePond.setOptions({
  // server: 'https://tusd.tusdemo.net/files/',
  // server: 'https://api.imgbb.com/1/upload?expiration=600&key=2687d4e89d82c888e74c77949c68ff38'
  // server: 'https://sm.ms/api/v2/upload'
  server: {
    url: 'https://api.imgur.com',
    timeout: 7000,
    process: {
      url: './3/image',
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 4050060b7e47b38',
      },
      onload: (response) => {
        console.log('response.key', response.key)
      },
      onerror: (response) => {
        console.log('response.data', response.data)
      },
      ondata: (formData) => {
        console.log('formData', formData)
        // formData.append('Hello', 'World')
        return formData
      },
    },
    revert: './revert',
    restore: './restore/',
    load: './load/',
    fetch: './fetch/',
  },
})
// create a FilePond instance at the input element location
const pond = FilePond.create({
  name: 'filepond',
  maxFiles: 10,
  allowBrowse: false,
})

// add our pond to the body
pond.appendTo(document.body)

document.addEventListener('FilePond:pluginloaded', (e) => {
  console.log('FilePond plugin is ready for use', e.detail)
})

var uppy = Uppy()
  .use(Dashboard, {
    inline: true,
    target: '#app',
  })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

uppy.on('complete', (result) => {
  console.log('Upload complete! We’ve uploaded these files:', result.successful)
  console.log('failed files:', result.failed)
})

document.addEventListener('paste', async (event) => {
  var items = event.clipboardData && event.clipboardData.items
  var image = null
  if (items && items.length) {
    // 检索剪切板items
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        image = items[i].getAsFile()
        break
      }
    }
  }
  // 此时file就是剪切板中的图片文件
  try {
    // const res = await pond.addFile(image)
    // const res = uploadFile(file)
    const res = uppy.addFile(image);
    console.log('res', res)
    // uppy.upload()
    document.activeElement.value = 'https://' + res.filename
  } catch (e) {
    console.error(e, 'xxxxxxxxxxxx')
  }
})
