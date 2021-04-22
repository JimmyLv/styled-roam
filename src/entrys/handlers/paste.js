import { handleFiles } from './handle-files'

export const interceptImagePaste = async (event) => {
  const items = event.clipboardData?.items
  await handleFiles(items, event)
}
