/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: ["veta.co.id"],
    // unoptimized: true,
  },
  env: {
    NEXTAUTH_SECRET: "3BRAQWnfbEfhT3fnlrVMEHe2T7TG9ky4sfs//Xx+8Vc=",
  },
};

module.exports = nextConfig;
