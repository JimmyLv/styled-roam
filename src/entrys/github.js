import { Octokit } from '@octokit/core'
const octokit = new Octokit({ auth: `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` })

function generateUuid() {
  return +new Date()
}

const generateFilename = (data) => {
  const matchedSuffix = data.match(/^data:image\/(.*);base64,/)
  const suffix = matchedSuffix[1]
  return `${generateUuid()}\.${suffix}`
}
export const uploadAsBase64 = async (data) => {
  const config = {
    repo: 'JimmyLv/images',
    branch: 'master',
    savePath: '2021',
  }
  // if (!auth.access_token) {
  //
  // }
  const [username, repo] = config.repo.split('/')
  if (config.savePath.startsWith('/')) config.savePath.substr(1)
  if (!config.savePath.endsWith('/') && config.savePath.length > 0) config.savePath += '/'
  const fileName = generateFilename(data)
  const filteredImage = data.replace(/^data:image\/.*;base64,/, '')
  const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: username,
    repo,
    branch: config.branch,
    path: `${config.savePath}${fileName}`,
    message: `Upload image "${fileName}"`,
    content: filteredImage,
  })
  return `${response?.data?.content.download_url}`
}
