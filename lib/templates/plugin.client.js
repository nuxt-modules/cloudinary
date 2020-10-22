import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'
import CloudinaryApi, { withSnakeCaseKeys } from './cloudinary-api'

const configuration = {
  cloudName: '<%= options.cloudName %>',
  privateCdn: <%= options.privateCDN || false %>,
  secure: <%= options.secure === undefined ? true : options.secure %>
}

<% if (options.secureDistribution) { %>
  configuration.secureDistribution = '<%= options.secureDistribution %>'
<% } else { %>
  configuration.cname = '<%= options.cname %>'
<% } %>

<% if (options.useComponent) { %>
Vue.use(Cloudinary, {
  configuration
})
<% } %>

class ClientApi extends CloudinaryApi {
  constructor(config) {
    super(config)
  }
  upload(file, options = {}, callback) {
    const $options = withSnakeCaseKeys(options)

    if (!($options.upload_preset || $options.signature)) {
      throw new Error('To perform unsigned client-side uploads to Cloudinary, you need to create an upload preset 👉: https://cloudinary.com/documentation/upload_presets')
    }

    if ($options.signature && !($options.api_key && $options.timestamp)) {
      throw new Error('Signed uploads require your Cloudinary API key, and a timestamp matching the one you used to generate the signature 👉: https://cloudinary.com/documentation/upload_images#generating_authentication_signatures')
    }

    const endpoint = `https://api.cloudinary.com/v1_1/${this._configurations.cloud_name}/upload`

    const request = fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...$options,
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
  const cloudinary = new ClientApi({
    cloud_name: configuration.cloudName,
    private_cdn: configuration.privateCdn,
    secure: configuration.secure,
    secure_distribution: configuration.secureDistribution,
    cname: configuration.cname
  })

  context.$cloudinary = cloudinary
  inject('cloudinary', cloudinary)
}

