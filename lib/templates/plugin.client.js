import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'

const configuration = {
  cloudName: '<%= options.cloudName %>',
  privateCdn: <%= options.privateCDN %>,
  secure: <%= options.secure === undefined ? true : options.secure %>
}

<% if (options.secureDistribution) { %>
  configuration.secureDistribution = '<%= options.secureDistribution %>'
<% } else { %>
  configuration.cname = '<%= options.cname %>'
<% } %>

Vue.use(Cloudinary, {
  configuration
})
