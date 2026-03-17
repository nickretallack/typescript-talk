npx webpack --mode=production --output-path=dist/webpack/production
npx webpack --mode=production --no-optimization-minimize --output-path=dist/webpack/production-unminified
npx webpack --mode=development --output-path=dist/webpack/development
npx esbuild main.cjs --bundle --platform=browser --outdir=dist/esbuild