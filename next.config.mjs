// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));
import withPWA from "next-pwa";

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    /**
     * If you have the "experimental: { appDir: true }" setting enabled, then you
     * must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ["de"],
        defaultLocale: "de",
    },
};

//TODO export pwaConfig as default
const pwaConfig = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
})(nextConfig);

const exportedConfig = process.env.NODE_ENV === "development" ? nextConfig : pwaConfig;
export default exportedConfig;
