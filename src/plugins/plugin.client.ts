import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'
import { ClientApi } from '../cloudinary/client'

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