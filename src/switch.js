import hotkeys from "hotkeys-js";
import { html } from "htm/react";
import tippy from "tippy.js";
import toggleCalendarTimestamp from "./calendar";
import { ShareMemex } from "./components/ShareMemex";
import { addToggleMode } from "./focus";
import { daysBetween } from "./utils/datetime";
import { appendIcon, switchTo } from "./utils/helper";
import { queryMinDate, queryNonCodeBlocks } from "./utils/queries";
import { createMenuOption } from "./utils/roam-utils";
import { downloadImage, shareImage } from "./utils/share-image";

const initialMode = localStorage.getItem("INIT_MODE") || "document";
document.querySelector("html").classList.add(initialMode);

const switchToCardList = function () {
  switchTo("card-mode");
  document.querySelector(".zoom-path-view.rm-zoom") &&
    document.querySelector(".zoom-path-view.rm-zoom").firstChild.click();
};

appendIcon("cardList", switchToCardList);
appendIcon("cardFlow", function () {
  switchTo("flow-mode");
});
appendIcon("document", function () {
  switchTo("document-mode");
});
appendIcon("download", async function () {
  const existing = document.getElementById("share-card");
  if (!existing) {
    const element = document.createElement("div");
    element.id = "share-card";
    document.querySelector(".bp3-portal").appendChild(element);
  }
  const min_date = await roamAlphaAPI.q(queryMinDate);
  const usageDays = daysBetween(new Date(), new Date(min_date));
  const blocksNum = await roamAlphaAPI.q(queryNonCodeBlocks);

  const memo = { slug: "jimmylv" };
  ReactDOM.render(
    html`<${ShareMemex}
      usageDays=${usageDays}
      blocksNum=${blocksNum}
      onSave=${() => downloadImage(imageSrc, memo.slug + ".png")}
      onClose=${() =>
        ReactDOM.unmountComponentAtNode(document.getElementById("share-card"))}
    />`,
    document.getElementById("share-card")
  );

  const imageSrc = await shareImage(memo);
  createMenuOption("Share Card", shareImage);
});
const toggleCalendarMode = toggleCalendarTimestamp();
const toggleFocusMode = addToggleMode({
  id: "mode-toggle-focus",
  on: "eye-on",
  off: "eye-open",
  styleContent: `
	.roam-block-container div[id]{
  		opacity: 0.2;
    }
	.roam-block-container div[id]:hover{
 	 	opacity: 1;
	}
  .roam-toolkit-block-mode--highlight {
    opacity: 1 !important;
  }
`,
});

export default function initCardifyTheme() {
  hotkeys("alt+shift+1", function (event, handler) {
    event.preventDefault();
    switchToCardList();
  });
  hotkeys("alt+shift+2", function (event, handler) {
    event.preventDefault();
    switchTo("flow-mode");
  });
  hotkeys("alt+shift+3", function (event, handler) {
    event.preventDefault();
    switchTo("document-mode");
  });
  hotkeys("alt+shift+4", function (event, handler) {
    event.preventDefault();
    toggleCalendarMode();
  });
  hotkeys("alt+shift+c", function (event, handler) {
    event.preventDefault();
    toggleCalendarMode();
  });
  hotkeys("alt+shift+5", function (event, handler) {
    event.preventDefault();
    toggleFocusMode();
  });
  hotkeys("alt+shift+f", function (event, handler) {
    event.preventDefault();
    toggleFocusMode();
  });

  tippy("#mode-button-cardList", {
    content: `Card List<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-1)</span>`,
    allowHTML: true,
    theme: "light-border",
  });

  tippy("#mode-button-cardFlow", {
    content: `Card Flow<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-2)</span>`,
    allowHTML: true,
    theme: "light-border",
  });

  tippy("#mode-button-document", {
    content: `Outliner<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-3)</span>`,
    allowHTML: true,
    theme: "light-border",
  });
  tippy("#mode-toggle-calendar", {
    content: `Calendar<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-4/c)</span>`,
    allowHTML: true,
    theme: "light-border",
  });
  tippy("#mode-toggle-focus", {
    content: `Focus<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-5/f)</span>`,
    allowHTML: true,
    theme: "light-border",
  });
  console.log("started styled-roam");
}
