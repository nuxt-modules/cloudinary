import { ClientApi } from '@nuxtjs/cloudinary'

const configuration = {
  cloudName: '<%= options.cloudName %>',
  privateCdn: <%= options.privateCdn || false %>,
  secure: <%= options.secure === undefined ? true : options.secure %>
}

<% if (options.secureDistribution) { %>
  configuration.secureDistribution = '<%= options.secureDistribution %>'
<% } else { %>
  configuration.cname = '<%= options.cname %>'
<% } %>

<% if (options.useComponent) { %>
import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'

Vue.use(Cloudinary, {
  configuration
})
<% } %>

export default function (context, inject) {
  const cloudinary = new ClientApi(configuration)

  context.$cloudinary = cloudinary
  inject('cloudinary', cloudinary)
}