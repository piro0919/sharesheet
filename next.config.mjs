import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default withNextra(nextConfig);
