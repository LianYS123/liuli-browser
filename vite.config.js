import { defineConfig } from "vite";
const path = require("path");
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      containers: path.resolve(__dirname, "./src/containers"),
      config: path.resolve(__dirname, "./src/config"),
      utils: path.resolve(__dirname, "./src/utils"),
      constants: path.resolve(__dirname, "./src/constants"),
      service: path.resolve(__dirname, "./src/service"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      model: path.resolve(__dirname, "./src/model"),
    },
  },
});
