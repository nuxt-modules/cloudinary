import { CloudConfig } from "cloudinary-build-url";
import CloudinaryApi from "./api";

export class ClientApi extends CloudinaryApi {
  constructor(configs: CloudConfig) {
   super(configs)
  }
  async upload(file, options = {}, callback) {
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