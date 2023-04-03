const withTM = require("next-transpile-modules")(["database"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  images: {
	remotePatterns: [
		{
			protocol: 'http',
			hostname: 'localhost'
		}
	]
  }
});

module.exports = nextConfig;
