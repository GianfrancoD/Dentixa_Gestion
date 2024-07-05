import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env,
});
