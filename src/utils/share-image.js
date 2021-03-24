import { html } from "htm/react";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
import { Footer, Header, ShareMemex } from "../components/ShareMemex";
import { daysBetween } from "./datetime";
import {
  getBlockInfoByUID,
  queryCurrentActiveBlockUID,
  queryMinDate,
  queryNonCodeBlocks,
} from "./queries";

const replaceAsImage = (imgUrl) => {
  const shareImage = document.querySelector("img.share-card");
  shareImage.src = imgUrl;
};

export const downloadImage = (imageUrl, memo) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = imageUrl;
  anchorElement.download = memo.username + "-" + memo.uid + ".png";

  const event = document.createEvent("MouseEvents");
  event.initEvent("click", true, true);

  anchorElement.dispatchEvent(event);
};

function reset() {
  document.querySelector("#share-card-header").remove();
  document.querySelector("#share-card-footer").remove();
  document
    .querySelector(".share-memex-container")
    .classList.remove("share-memex-container");
}

export async function shareImage(memo) {
  const node = document.querySelector(".share-memex-container");
  // 制作图片中，请稍等...
  const canvas = await html2canvas(node, {
    logging: false,
    scale: 3,
    useCORS: true,
    letterRendering: true,
  });
  const imageSrc = canvas.toDataURL("image/png", 1);

  // replaceAsImage(imageSrc);
  downloadImage(imageSrc, memo);
  // reset header and footer
  reset();
  return imageSrc;
}

export const shareAndDownloadImage = async function () {
  const existing = document.getElementById("share-card");
  if (!existing) {
    const element = document.createElement("div");
    element.id = "share-card";
    document.querySelector(".bp3-portal").appendChild(element);
  }
  const min_date = await roamAlphaAPI.q(queryMinDate);
  const usageDays = daysBetween(new Date(), new Date(min_date));
  const blocksNum = await roamAlphaAPI.q(queryNonCodeBlocks);

  const currentBlock = document.querySelector(
    ".roam-toolkit-block-mode--highlight"
  );
  // block-highlight-blue rm-block__self rm-block__input
  if (currentBlock) {
    const blockContainer = currentBlock.parentElement?.parentElement;
    blockContainer.classList.add("share-memex-container");

    const header = document.createElement("div");
    header.id = "share-card-header";
    blockContainer.prepend(header);

    const footer = document.createElement("div");
    footer.id = "share-card-footer";
    blockContainer.appendChild(footer);

    const activeBlock = queryCurrentActiveBlockUID(currentBlock);
    const blockInfo = await getBlockInfoByUID(activeBlock.uid);
    // console.log("blockInfo", activeBlock, blockInfo);
    // active element going to the 'download' button

    const memo = { ...activeBlock, ...blockInfo };

    ReactDOM.render(
      html`<${Header} block=${memo} />`,
      document.getElementById("share-card-header")
    );

    ReactDOM.render(
      html`<${Footer}
        blocksNum=${blocksNum}
        usageDays=${usageDays}
        block=${memo}
      />`,
      document.getElementById("share-card-footer")
    );

    /*ReactDOM.render(
      html`<${ShareMemex}
        block=${memo}
        usageDays=${usageDays}
        blocksNum=${blocksNum}
        onSave=${() => {
          if (!imageSrc) {
            alert("Please waiting for the image to be generated, :D");
          }
          downloadImage(imageSrc, memo);
        }}
        onClose=${() =>
          ReactDOM.unmountComponentAtNode(
            document.getElementById("share-card")
          )}
      />`,
      document.getElementById("share-card")
    );*/

    const imageSrc = await shareImage(memo);
    // TODO: initMenuOption()
  }
};
