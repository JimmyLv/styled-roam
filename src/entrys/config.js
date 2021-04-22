import { Dashboard, Transloadit } from 'uppy'

export const config = {
  companion_auth_key: window.roamFiles.TRANSLOADIT_API_KEY || '',
  dropbox_app_key: window.roamFiles.DROPBOX_APP_KEY || '',
  token: window.roamFiles.GITHUB_ACCESS_TOKEN || '',
  repo: window.roamFiles.repo || 'JimmyLv/images',
  branch: window.roamFiles.branch || 'master',
  savePath: window.roamFiles.savePath || new Date().getFullYear().toString(),
}
export const companionOptions = {
  target: Dashboard,
  companionUrl: Transloadit.COMPANION,
  companionAllowedHosts: Transloadit.COMPANION_PATTERN,
}
