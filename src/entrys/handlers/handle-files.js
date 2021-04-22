import { blobToBase64 } from '../base64'
import { formatBase64Payload } from '../providers/github'

export async function handleFiles(items, event) {
  if (items && items.length) {
    const queue = []

    // 检索剪切板或拖拽 items
    for (const item of items) {
      if (item.type.includes('image')) {
        event.stopPropagation()
        event.preventDefault()

        const image = item.getAsFile()
        queue.push(blobToBase64(image).then((base64Image) => ({ image, base64Image })))
      }
    }

    const images = await Promise.all(queue)

    // only handle for image files currently
    images.forEach(({ image, base64Image }) => {
      try {
        const { endpoint, payload } = formatBase64Payload(base64Image)
        // https://uppy.io/docs/uppy/#uppy-addFile-fileObject
        window.uppy.addFile({
          name: image.name,
          type: image.type,
          data: image, // file blob
          meta: { endpoint, payload },
          source: 'RoamResearch',
          preview: URL.createObjectURL(image),
        })
        // await uppy.upload()
      } catch (e) {
        console.error(e, 'xxxxxxxxxxxx')
      }
    })
  }
}
