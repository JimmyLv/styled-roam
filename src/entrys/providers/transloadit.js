export const transloaditOptions = {
  importFromUploadURLs: true,
  alwaysRunAssembly: false,
  waitForEncoding: false,
  params: {
    auth: {
      key: config.companion_auth_key,
    },
    steps: {
      ':original': {
        robot: '/upload/handle',
      },
      compress_image: {
        use: ':original',
        robot: '/image/optimize',
        progressive: true,
      },
      export: {
        use: ['compress_image'],
        robot: '/file/serve',
      },
    },
    // https://transloadit.com/c/
  },
}
