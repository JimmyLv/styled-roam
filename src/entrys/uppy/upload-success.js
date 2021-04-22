export function uploadSuccess() {
  return (file, response) => {
    console.log('upload-success', file, response.uploadURL);
  };
}
