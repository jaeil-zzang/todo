const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePath: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
