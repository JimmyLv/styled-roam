import { Octokit } from '@octokit/core'
import { config } from './config'

const octokit = new Octokit({ auth: config.token })

function generateUuid() {
  return +new Date()
}
const generateFilename = (data) => {
  const matchedSuffix = data.match(/^data:image\/(.*);base64,/)
  const suffix = matchedSuffix[1]
  return `${generateUuid()}\.${suffix}`
}
export const uploadAsBase64 = async (data) => {
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

export const formatBase64Payload = (data) => {
  const [username, repo] = config.repo.split('/')

  if (config.savePath.startsWith('/')) config.savePath.substr(1)
  if (!config.savePath.endsWith('/') && config.savePath.length > 0) config.savePath += '/'

  const fileName = generateFilename(data)
  const filteredImage = data.replace(/^data:image\/.*;base64,/, '')

  return {
    endpoint: `https://api.github.com/repos/${username}/${repo}/contents/${config.savePath}${fileName}`,
    payload: {
      branch: config.branch,
      message: `Upload image "${fileName}"`,
      content: filteredImage,
    },
  }
}
