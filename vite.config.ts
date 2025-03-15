import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: {
    exclude: ["lucide-react"],
  },

  // ✅ Rutas bien configuradas para Azure
  base: "./", // Ruta relativa para asegurar carga correcta

  build: {
    outDir: "dist", // Mantiene la carpeta que Azure espera
    assetsDir: "assets", // Ordena archivos estáticos (JS/CSS/img)
    rollupOptions: {
      output: {
        // ✅ Garantiza que los archivos carguen con rutas relativas
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },

  server: {
    host: true,
    port: 5173,
  },
});
