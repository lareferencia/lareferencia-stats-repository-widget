#!/usr/bin/env node

const cssModulesPlugin = require("esbuild-css-modules-plugin");
const copyStaticFiles = require('esbuild-copy-static-files');

// const inlineImage = require("esbuild-plugin-inline-image");

require("esbuild")
  .build({
    logLevel: "info",
    format:'esm',
    outdir: "dist/chunks",
    entryPoints: ["src/main.tsx"],
    inject: ["scripts/react-shim.js"],
    treeShaking: true,
    bundle: true,
    plugins: [
      cssModulesPlugin(),
      copyStaticFiles({
        src: 'src/assets', // Directorio fuente de los archivos estáticos
        dest: 'dist/assets', // Directorio destino para los archivos estáticos
        dereference: true, // Follow symbolic links (optional)
      }),
    ],
    loader: {
      '.js': 'tsx',
      '.png': 'dataurl', // Configura el cargador para archivos PNG
    },
    minify: true,
    target: "es2015",
    entryNames: "historic-widget",
    color: true,
    splitting: true, // Habilita la opción de dividir el código en chunks
    chunkNames: "lrhw-chunk-[hash]", // Define un patrón de nombres para los chunks generados
  })
  .catch(() => process.exit(1))
  .then(() => {});