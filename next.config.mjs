/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    useLightningcss: true,
  },
};

export default nextConfig;
