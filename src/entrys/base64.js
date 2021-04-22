export const getImgBase64 = async (url) => {
  const convertImgToBase64URL = (url) => {
    console.log('url', url)
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        let canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL()
        canvas = null
        resolve(dataURL)
      }
      img.src = url
    })
  }
  const image = await convertImgToBase64URL(url)
  console.log('image convertImgToBase64URL', image)
}

export async function blobToBase64(blob) {
  console.log('blobToBase64', blob)
  if (blob.thumbnail) {
    console.log('blob.thumbnail', blob.thumbnail)
    // console.log('blob.thumbnail', JSON.parse(blob.toString()))
    const data = await fetch(blob.thumbnail)
    const blob = await data.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

export function retrieveImageFromClipboardAsBase64(pasteEvent, callback, imageFormat) {
  if (pasteEvent.clipboardData === false) {
    if (typeof callback === 'function') {
      callback(undefined)
    }
  }

  // retrieve elements from clipboard
  var items = pasteEvent.clipboardData.items

  if (items === undefined) {
    if (typeof callback === 'function') {
      callback(undefined)
    }
  }
  // loop the elements
  for (var i = 0; i < items.length; i++) {
    // Skip content if not image
    if (items[i].type.indexOf('image') === -1) continue
    // Retrieve image on clipboard as blob
    var blob = items[i].getAsFile()

    // Create an abstract canvas and get context
    var mycanvas = document.createElement('canvas')
    var ctx = mycanvas.getContext('2d')

    // Create an image
    var img = new Image()

    // Once the image loads, render the img on the canvas
    img.onload = function () {
      // Update dimensions of the canvas with the dimensions of the image
      mycanvas.width = this.width
      mycanvas.height = this.height

      // Draw the image
      ctx.drawImage(img, 0, 0)

      // Execute callback with the base64 URI of the image
      if (typeof callback === 'function') {
        callback(mycanvas.toDataURL(imageFormat || 'image/png'))
      }
    }

    // Crossbrowser support for URL
    var URLObj = window.URL || window.webkitURL

    // Creates a DOMString containing a URL representing the object given in the parameter
    // namely the original Blob
    img.src = URLObj.createObjectURL(blob)
  }
}
