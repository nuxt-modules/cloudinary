import { ClientApi } from '~cloudinary/client'

const configuration = <%= JSON.stringify(options, null, 2) %>

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