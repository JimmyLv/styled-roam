import { getActiveUids } from 'roam-client'
import { config } from '../config'
import { saveToDropbox } from '../providers/dropbox'
import { appendFileBlock } from '../roam'

export function complete(result) {
  if (result.successful.length > 0) {
    // XHRUpload limit: 1,
    console.log('complete result.successful', result.successful)
    result.successful.forEach(async ({ response }, index) => {
      const { uploadURL } = response
      console.log('successful response', response)
      const mdLink = `![](${uploadURL})`

      // already has value
      const { type, textContent } = document.activeElement
      if (type === 'textarea') {
        const { blockUid, parentUid } = getActiveUids()

        if (!textContent) {
          window.roamAlphaAPI.updateBlock({
            block: { uid: blockUid, string: mdLink },
          })
        } else {
          const uid = window.roamAlphaAPI.util.generateUID()
          window.roamAlphaAPI.createBlock({
            location: { 'parent-uid': parentUid, order: 0 },
            block: { uid, string: mdLink },
          })
        }
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
