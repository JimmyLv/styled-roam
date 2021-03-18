import { isIOS, isMacOs } from "mobile-device-detect";

export const isApple = isIOS || isMacOs;

export const createOverlayObserver = (mutationCallback) =>
  createDivObserver(mutationCallback, document.body);

const createDivObserver = (mutationCallback, mutationTarget) => {
  const observer = new MutationObserver(mutationCallback);
  observer.observe(mutationTarget, { childList: true, subtree: true });
};
