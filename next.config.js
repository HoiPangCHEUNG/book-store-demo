/** @type {import('next').NextConfig} */
const nextConfig = {
  /** 
   This is for demo purposes only, you should not allow all hosts in production
   see https://nextjs.org/docs/messages/next-image-unconfigured-host
   you should instead add whitelisted domains to the remotePatterns array
   e.g. aws s3 bucket, cloudinary, etc.
  */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
