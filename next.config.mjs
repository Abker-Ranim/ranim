/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the Next.js "N" dev badge (it only ever shows in `next dev`).
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig