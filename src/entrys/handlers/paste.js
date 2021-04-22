import { handleFiles } from './handle-files'

export const interceptImagePaste = async (event) => {
  const items = event.clipboardData?.items
  const images = handleFiles(items)
  if (images) {
    event.stopPropagation()
    event.preventDefault()
  }
}
