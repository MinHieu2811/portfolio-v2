import { v2 } from 'cloudinary'
import getConfig from 'next/config'

const configCloudinary = v2.config({
  cloud_name: getConfig().publicRuntimeConfig.cloudName,
  api_secret: getConfig().publicRuntimeConfig.apiSecret,
  api_key: getConfig().publicRuntimeConfig.apiKey,
  secure: true
})

export { configCloudinary }
