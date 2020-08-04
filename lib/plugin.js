// const sdk = require('cloudinary-core')
const sdk = require('cloudinary').v2

const initCloudinary = () => {
  const instance = new sdk.Cloudinary({
    cloud_name: '<%= options.cloud_name %>',
    api_key: '<%= options.api_key %>',
    api_secret: '<%= options.api_secret %>',
    cname: '<%= options.cname %>',
    secure_distribution: '<%= options.secure_distribution %>',
    private_cdn: '<%= options.private_cdn %>',
    cdn_subdomain: '<%= options.cdn_subdomain %>',
    secure: '<%= options.secure === undefined ? true : options.secure %>',
  })

  // support multiple clouds?
  // transformation
  // image tag  

  <% if (options.responsive) { %>instance.responsive()<% } %> // BUG - document doesn't exist

  return instance
}

export default function (context, inject ) {
  const instance = initCloudinary()
  context.$cloudinary = instance
  inject('cloudinary', instance)
}
