import { createBlock, updateActiveBlock } from 'roam-client';

export function appendFileBlock(fileLink) {
  if (document.activeElement.type === 'textarea') {
    updateActiveBlock(fileLink);
  } else {
    // 'https://roamresearch.com/#/app/Note-Tasking/page/1OLUyHxAM'
    const uid = location.href.substring(location.href.length - 9);
    createBlock({ node: { text: fileLink }, parentUid: uid });
  }
}
