import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envFile: ".env",
  envPrefix: "VITE_",
  define: {
    "process.env": { VITE_API_URL: "http://127.0.0.1:5000" },
  },
});
