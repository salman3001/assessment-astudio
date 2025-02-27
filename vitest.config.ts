import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setupTests.ts",
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src/"),
    },
  },
});
