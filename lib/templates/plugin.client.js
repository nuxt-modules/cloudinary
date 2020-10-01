import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'
import CloudinaryApi from './cloudinary-api'

const configurations = {
  cloud_name: '<%= options.cloudName %>',
  private_cdn: <%= options.privateCDN || false %>,
  secure: <%= options.secure === undefined ? true : options.secure %>,
  api_key: '<%= options.apiKey %>',
  api_secret: '<%= options.apiSecret %>',
}

<% if (options.secureDistribution) { %>
  configurations.secure_distribution = '<%= options.secureDistribution %>'
<% } else { %>
  configurations.cname = '<%= options.cname %>'
<% } %>

<% if (options.useComponent) { %>
Vue.use(Cloudinary, {
  configuration: {
    cloudName: configurations.cloud_name,
    privateCdn: configurations.private_cdn,
    secure: configurations.secure,
    cname: configurations.cname,
    secureDistribution: configurations.secure_distribution
  }
})
<% } %>

class ClientApi extends CloudinaryApi {
  constructor(config) {
    super(config)
  }
  upload(file, options, callback) {
    if (!options.uploadPreset) {
      throw new Error('To use upload to Cloudinary on client side, you need to set up upload preset 👉: https://cloudinary.com/documentation/upload_presets')
    }
  
    const endpoint = `https://api.cloudinary.com/v1_1/${this._configurations.cloud_name}/upload`

    const request = fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...options,
        upload_preset: options.uploadPreset,
        file: file,
      })
    }).then(res => res.json())

    if (callback) {
      request
      .then(res => {
        if (res.error) {
          callback(res.error, null)
        }
        else {
          callback(null, res)
        }
      })
      .catch(err => callback(err, res))
    }

    return request
  }
}

export default function (context, inject) {
  const cloudinary = new ClientApi(configurations)

  context.$cloudinary = cloudinary
  inject('cloudinary', cloudinary)
}

