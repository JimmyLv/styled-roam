import { createBlock, getPageUidByPageTitle, toRoamDate } from 'roam-client';

const sleep = (m) => new Promise((r) => setTimeout(r, m))

export async function appendFileBlock(fileLink) {
  // 'https://roamresearch.com/#/app/Note-Tasking/page/1OLUyHxAM'
  // https://roamresearch.com/#/app/Note-Tasking
  const uid = getCurrentPageUid()
  console.log(`update uid ${uid} text to `, fileLink)
  createBlock({ node: { text: fileLink }, parentUid: uid })
}

export const getCurrentPageUid = () =>
  window.location.hash.match(/\/page\/(.*)$/)?.[1] || getPageUidByPageTitle(toRoamDate(new Date()))
