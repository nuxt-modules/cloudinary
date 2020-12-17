export default function (context, inject) {
  const $cloudinary = context.ssrContext.$cloudinary
 
  context.$cloudinary = $cloudinary
  inject('cloudinary', $cloudinary)
 }
 