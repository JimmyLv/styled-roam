export function handleFiles(items) {
  var image = null;
  if (items && items.length) {
    // 检索剪切板items
    for (let i = 0; i < items.length; i++) {
      console.log(`event.clipboardData items[${i}]`, items[i]);
      if (items[i].type.includes('image') || items[i].type.includes('pdf')) {
        image = items[i].getAsFile();
        break;
      }
    }
  }

  if (image) {
    // only handle for image files currently
    try {
      window.uppy.addFile({
        source: 'RoamResearch',
        name: image.name,
        type: image.type,
        data: image,
        preview: URL.createObjectURL(image),
      });
      // await uppy.upload()
    } catch (e) {
      console.error(e, 'xxxxxxxxxxxx');
    }
  }

  return image
}
