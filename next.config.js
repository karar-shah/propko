/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose",
        serverComponentsExternalPackages: ["mongoose"]
    },
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            }
        ]
    }
}

module.exports = nextConfig
