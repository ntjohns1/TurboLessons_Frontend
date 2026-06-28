import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import postcssImport from "postcss-import";
import postcssCalc from "postcss-calc";
import postcssCustomProperties from "postcss-custom-properties";
import react from "@vitejs/plugin-react";
import path from "path";
import getEnvModule from "./env";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

getEnvModule().setEnvironmentVarsFromTestEnv(__dirname);

process.env.CLIENT_ID = process.env.SPA_CLIENT_ID || process.env.CLIENT_ID;

const env = {};

// List of environment variables made available to the app
["ISSUER", "CLIENT_ID","VITE_STRIPE_PUBLISHABLE_KEY"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`);
  }
  // console.log(`Environment Variable Loaded: ${key} = ${process.env[key]}`);
  env[key] = process.env[key];
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    "process.env": env,
    global: "globalThis", // handle the global variable issue
  },
  resolve: {
    alias: {
      "react-router-dom": path.resolve(
        __dirname,
        "node_modules/react-router-dom"
      ),
    },
  },
  server: {
    port: process.env.PORT || 3000,
    proxy: {
      // Dev proxy: forward API + WS to the live backend (qac by default) so
      // `npm run start` runs against it without a local backend. Override with
      // VITE_API_PROXY_TARGET=http://localhost:8080 to hit a local stack.
      // changeOrigin rewrites Host so Caddy routes qac.turbolessons.com correctly.
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://qac.turbolessons.com',
        changeOrigin: true,
        secure: true,
      },
      '/ws': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://qac.turbolessons.com',
        changeOrigin: true,
        secure: true,
        ws: true,
      }
    },
  },
  build: {
    rollupOptions: {
      // always throw with build warnings
      onwarn(warning, warn) {
        // Suppress "Module level directives cause errors when bundled" warnings
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
    css: {
      postcss: {
        plugins: [
          postcssImport(),
          postcssCustomProperties({
            preserve: false,
          }),
          postcssCalc(),
        ],
      },
    },
  },
});
