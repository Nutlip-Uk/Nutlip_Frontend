/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'public/videos/[name].[ext]',
            publicPath: 'videos/',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
