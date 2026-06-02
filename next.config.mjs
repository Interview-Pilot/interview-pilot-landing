import { build } from 'velite'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  experimental: {},

  // Add headers for apple-app-site-association
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/interview',
        destination: '/interview-copilot',
        permanent: false,
      },
      {
        source: '/practice',
        destination: '/question-bank',
        permanent: false,
      },
      {
        source: '/event/interview',
        destination: '/interview-copilot',
        permanent: false,
      },
      {
        source: '/event/practice',
        destination: '/question-bank',
        permanent: false,
      },
      {
        source: '/subscription',
        destination: '/pricing',
        permanent: false,
      },
      {
        source: '/subscribe',
        destination: '/pricing',
        permanent: false,
      },
      {
        source: '/pro',
        destination: '/pricing',
        permanent: false,
      },
      {
        source: '/event/subscription',
        destination: '/pricing',
        permanent: false,
      },
      {
        source: '/event/subscribe',
        destination: '/pricing',
        permanent: false,
      },
    ]
  },

  webpack(config) {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    })

    // Velite integration
    config.plugins.push(new VeliteWebpackPlugin())

    return config
  },
}

class VeliteWebpackPlugin {
  static started = false

  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options
  }

  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      this.options.watch = this.options.watch ?? dev
      this.options.clean = this.options.clean ?? !dev
      await build(this.options)
    })
  }
}

export default nextConfig
