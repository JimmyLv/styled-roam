import html2canvas from "html2canvas";

const replaceAsImage = (imgUrl) => {
  const shareImage = document.querySelector("img.share-card");
  shareImage.src = imgUrl;
};

export const downloadImage = (imageUrl, filename) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = imageUrl;
  anchorElement.download = filename;

  const event = document.createEvent("MouseEvents");
  event.initEvent("click", true, true);

  anchorElement.dispatchEvent(event);
};

export async function shareImage(memo) {
  const node = document.querySelector(".share-memex-container .card");
  // 制作图片中，请稍等...
  const canvas = await html2canvas(node, {
    logging: false,
    scale: 3,
    useCORS: true,
    letterRendering: true,
  });
  const imageSrc = canvas.toDataURL("image/png", 1);

  replaceAsImage(imageSrc);
  downloadImage(imageSrc, memo.slug + ".png");

  return imageSrc;
}
