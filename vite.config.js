import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "analyze" &&
      visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split Firebase into its own chunk - it's huge
          if (id.includes("firebase")) {
            return "firebase";
          }
          // Split paper.js (LiquidBackground dependency)
          if (id.includes("paper")) {
            return "paper";
          }
          // Split GSAP
          if (id.includes("gsap")) {
            return "gsap";
          }
          // Split react-router
          if (id.includes("react-router") || id.includes("@remix-run")) {
            return "router";
          }
        },
      },
    },
  },
}));
