import { switchTo } from "../utils/dom-helper";

export const switchToEditCard = function () {
  switchTo("edit-mode");
  let selected = document.querySelector('textarea[autocapitalize="none"]');
  if (selected) {
    selected.parentNode.parentNode.parentNode
      .querySelector(".simple-bullet-inner")
      .click();
  } else {
    document
      .querySelector(".block-highlight-blue")
      .querySelector(".simple-bullet-inner")
      .click();
  }
};
