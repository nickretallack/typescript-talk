npx webpack --mode=production --output-filename=webpack-production-bundle.js
npx webpack --mode=production --no-optimization-minimize --output-filename=webpack-production-unminified-bundle.js
npx webpack --mode=development --output-filename=webpack-development-bundle.js
npx esbuild main.cjs --bundle --platform=browser --outfile=dist/esbuild-bundle.js
