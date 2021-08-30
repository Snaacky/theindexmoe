/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff"
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "default-src 'self'; img-src *; script-src 'self' https://cdn.jsdelivr.net"
                    }
                ]
            }
        ]
    },
    images: {
        domains: ["cdn.discordapp.com"]
    }
}

module.exports = nextConfig
