import html2canvas from "html2canvas";

export function shareImage({ memo = { slug: "jimmylv" } }) {
  const node = document.querySelector(".share-memex-container .card");
  // 制作图片中，请稍等...
  html2canvas(node, {
    logging: false,
    scale: 3,
    useCORS: true,
    letterRendering: true,
  }).then((canvas) => {
    const replaceAsImage = (imgUrl) => {
      const shareImage = document.querySelector("img.share-card");
      shareImage.src = imgUrl;
    };
    const downloadImage = (imageUrl, filename) => {
      const anchorElement = document.createElement("a");
      anchorElement.href = imageUrl;
      anchorElement.download = filename;
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      anchorElement.dispatchEvent(event);
    };
    const height = canvas.height;
    const width = canvas.width;
    const imageSrc = canvas.toDataURL("image/png", 1);

    const image = new Image();
    image.src = imageSrc;
    image.width = width;
    image.height = height;
    image.crossOrigin = "Anonymous";
    replaceAsImage(image.src);
    downloadImage(imageSrc, memo.slug + ".png");
  });
}
