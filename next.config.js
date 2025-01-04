/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  publicRuntimeConfig: {
    cloudName: process.env.CLOUD_NAME,
    apiSecret: process.env.API_SECRET,
    apiKey: process.env.API_KEY,
    uploadPreset: process.env.UPLOAD_PRESET
  },
  serverRuntimeConfig: {
    uploadPreset: process.env.UPLOAD_PRESET
  }
};

module.exports = nextConfig;
