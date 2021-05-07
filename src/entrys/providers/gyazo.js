import { config } from '../config'

// https://uppy.io/docs/xhr-upload/#formData-true
export const gyazoOptions = {
  endpoint: `https://upload.gyazo.com/api/upload?access_token=${config.gyazo?.access_token}`,
  // method: 'post',
  // limit: 1,
  // formData: true,
  // fieldName: 'files[]',
  // metaFields: null
  headers: {
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
}
