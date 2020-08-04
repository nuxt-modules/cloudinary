import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'

const configuration = {
  cloudName: '<%= options.cloudName %>',
  api_key: '<%= options.apiKey %>',
  api_secret: '<%= options.apiSecret %>',
  private_cdn: '<%= options.privateCDN %>',
  secure: '<%= options.secure === undefined ? true : options.secure %>'
}

// <%if (options.secureDistribution) {%>
//   configuration.secure_distribution = '<%= options.secureDistribution %>'
// <%} else {%>
//   configuration.cname = '<%= options.cname %>'
// <%}%>

Vue.use(Cloudinary, {
  configuration
})
