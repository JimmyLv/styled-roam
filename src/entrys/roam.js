import { createBlock, updateActiveBlock } from 'roam-client';

export function appendImageBlock(mdLink) {
  if (document.activeElement.type === 'textarea') {
    updateActiveBlock(mdLink);
  } else {
    // 'https://roamresearch.com/#/app/Note-Tasking/page/1OLUyHxAM'
    const uid = location.href.substring(location.href.length - 9);
    createBlock({ node: { text: mdLink }, parentUid: uid });
  }
}
