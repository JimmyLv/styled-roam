import axios from 'axios'

function getResponse(data) {
  const response = data.data
  if (response.code !== 'success') {
    throw new Error(response.msg)
  }
  return response
}

function smms(file) {
  const data = new FormData()
  data.append('smfile', file)
  data.append('ssl', true)
  return axios.post('https://sm.ms/api/upload', data).then(getResponse)
}

smms.list = function () {
  return axios.get('https://sm.ms/api/list').then(getResponse)
}

smms.clear = function () {
  return axios.get('https://sm.ms/api/clear').then(getResponse)
}

smms.remove = function (hash) {
  return axios.get('https://sm.ms/api/delete/' + hash)
}

export default smms
