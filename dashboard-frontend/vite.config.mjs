import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) {
            return "react";
          }

          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }

          if (id.includes("node_modules/recharts")) {
            return "recharts";
          }

          if (
            id.includes("node_modules/victory-vendor") ||
            id.includes("node_modules/d3-") ||
            id.includes("node_modules/internmap")
          ) {
            return "chart-vendors";
          }

          return undefined;
        },
      },
    },
  },
});
