import { updateActiveBlock } from 'roam-client'
import { config } from '../config'
import { saveToDropbox } from '../providers/dropbox'
import { appendFileBlock } from '../roam'

export function complete(result) {
  if (result.successful.length > 0) {
    result.successful.forEach(async (result) => {
      const { uploadURL } = result.response
      console.log('successful result response', result.response)
      const mdLink = `![](${uploadURL})`

      if (result.successful.length === 1 && document.activeElement.type === 'textarea') {
        updateActiveBlock(mdLink)
      } else {
        await appendFileBlock(mdLink)
      }

      if (config.dropbox_app_key) {
        await saveToDropbox(uploadURL)
      }
    })
  }
  if (result.failed.length > 0) {
    console.log('failed files:', result.failed)
    console.error('Errors:')
    result.failed.forEach((file) => {
      console.error(file.error)
    })
  }
}
