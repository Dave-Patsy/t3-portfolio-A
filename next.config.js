/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    // eslint-disable-next-line
    config.module.rules.push({
      test: /\.(glsl|vs|fs|frag|vert)$/,
      type: "asset/source",
    });
    // eslint-disable-next-line
    return config;
  },
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "utfs.io",
      "uploadthing.com",
      "raw.githubusercontent.com",
      "source.unsplash.com",
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default config;
