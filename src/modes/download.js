import { renderFooter, renderHeader } from '../components/ShareMemex'
import { daysBetween } from '../utils/datetime'
import { appendIcon } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import { getBlockInfoByUID, queryCurrentActiveBlockUID, queryMinDate, queryNonCodeBlocks } from '../utils/queries'
import { shareImage } from '../utils/share-image'

const shareAndDownloadImage = async function () {
  const existing = document.getElementById('share-card')
  if (!existing) {
    const element = document.createElement('div')
    element.id = 'share-card'
    document.querySelector('.bp3-portal').appendChild(element)
  }
  const min_date = await roamAlphaAPI.q(queryMinDate)
  const usageDays = daysBetween(new Date(), new Date(min_date))
  const blocksNum = await roamAlphaAPI.q(queryNonCodeBlocks)

  const currentZoomContainer = document.querySelector('[style="margin-left: -20px;"]')
  const currentHighlightBlock = document.querySelector('.roam-toolkit-block-mode--highlight')

  // block-highlight-blue rm-block__self rm-block__input
  if (currentZoomContainer || currentHighlightBlock) {
    const blockContainer = currentZoomContainer
      ? currentZoomContainer
      : currentHighlightBlock.parentElement?.parentElement
    blockContainer.classList.add('share-memex-container')

    const header = document.createElement('div')
    header.id = 'share-card-header'
    blockContainer.prepend(header)

    const footer = document.createElement('div')
    footer.id = 'share-card-footer'
    blockContainer.appendChild(footer)

    const activeBlock = queryCurrentActiveBlockUID(
      currentZoomContainer
        ? currentZoomContainer.querySelector('.rm-block__self .rm-block-text')
        : currentHighlightBlock,
      blockContainer,
    )
    const blockInfo = await getBlockInfoByUID(activeBlock.uid)
    // console.log("blockInfo", activeBlock, blockInfo);
    // active element going to the 'download' button

    const memo = { ...activeBlock, ...blockInfo }

    renderHeader(memo)
    renderFooter(blocksNum, usageDays, memo)

    const imageSrc = await shareImage(memo)
    // TODO: initMenuOption()
  }
}

export default function initDownloadMode() {
  appendIcon('download', shareAndDownloadImage)
  addHotKeys({
    shortcutKeys: 'd',
    modeId: '#mode-button-download',
    modeName: 'Share Card',
    async modeAction() {
      await shareAndDownloadImage()
    },
  })
}
