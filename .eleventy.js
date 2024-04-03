const nodeModules = require('node_modules-path')
const fs = require('fs/promises')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.on(
		"eleventy.after",
		async ({ dir, results, runMode, outputMode }) => {
      await fs.mkdir(`${dir.output}/js`, { recursive: true })
      for(const file of await fs.readdir(`${nodeModules('vue')}/vue/dist/`)) {
        await fs.copyFile(`${nodeModules('vue')}/vue/dist/${file}`, `${dir.output}/js/${file}`)
      }
      for(const file of await fs.readdir(`${nodeModules('@silexlabs/silex')}/@silexlabs/silex/dist/client/js/`)) {
        await fs.copyFile(`${nodeModules('@silexlabs/silex')}/@silexlabs/silex/dist/client/js/${file}`, `${dir.output}/js/${file}`)
      }
		}
	)
  return {
    dir: {
      input: 'pages',
      includes: '../_includes',
      layouts: '../_includes',
      data: '../_data',
    }
  }
}