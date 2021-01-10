/* eslint-disable */
import CloudinaryApi from './api'
import { toSnakeCase } from '@cld-apis/utils'
import { CloudConfig } from '@cld-apis/types'

export class ClientApi extends CloudinaryApi {
  async upload (file: string, options:Object = {}, callback?: Function) {
    const $options = toSnakeCase(options)

    const endpoint = `https://api.cloudinary.com/v1_1/${this.configurations.cloudName}/upload`

    const request = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...$options,
        file
      })
    }).then(res => res.json())
    .catch(error => ({ error }))

    if (callback) {
      if (request.error) {
        callback(request.error, null)
      } else {
        callback(null, request)
      }
    }

    return request
  }

  config (config: CloudConfig = {}) {
    return new ClientApi({
      ...this.configurations,
      ...config
    })
  }
}
