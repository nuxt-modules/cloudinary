import { ServerApi } from "~cloudinary/server";

const configuration = <%= JSON.stringify(options, null, 2) %>

export default function(context, inject) {
  const cloudinary = new ServerApi(configuration);

  context.$cloudinary = cloudinary;
  inject("cloudinary", cloudinary);
}