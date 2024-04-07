import nodeModules from 'node_modules-path'
import fs from 'fs/promises'

export default function (eleventyConfig) {
  // Silex CMS
  eleventyConfig.addPassthroughCopy({"_published/css/*.css": "css"});
  eleventyConfig.addPassthroughCopy({"_published/assets": "assets"});

  // For the fetch plugin
  eleventyConfig.watchIgnores.add('**/.cache/**')

  // Delete _site before eleventy starts
  eleventyConfig.on(
    "eleventy.before",
    async ({dir, runMode, outputMode}) => {
      return fs.rm(dir.output, { recursive: true })
    },
  )
  // Serve node_modules
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