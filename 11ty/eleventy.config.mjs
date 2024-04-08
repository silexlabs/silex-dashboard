import { EleventyI18nPlugin } from '@11ty/eleventy'
import nodeModules from 'node_modules-path'
import fs from 'fs/promises'

export default async function (eleventyConfig) {
  // Silex CMS
  eleventyConfig.addPassthroughCopy({"templates/css/*.css": "css"});
  eleventyConfig.addPassthroughCopy({"templates/assets": "assets"});

  // For the fetch plugin
  eleventyConfig.watchIgnores.add('**/.cache/**')

  // Delete _site before eleventy starts
  eleventyConfig.on(
    "eleventy.before",
    async ({dir, runMode, outputMode}) => {
      try {
        return await fs.rm(dir.output, { recursive: true })
      } catch(e) {
        if(e.code === 'ENOENT') {
          return
        }
        throw e
      }
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
  // // Ignore all files from ../.gitignore
  // eleventyConfig.setUseGitIgnore(false)
  // const content = await fs.readFile('.gitignore', 'utf8')
  // const files = content.split('\n')
  // for (const file of files) {
  //   if (file.trim() !== '') {
  //     eleventyConfig.ignores.add(file.trim())
  //   }
  // }
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
	})

  // Return the configuration object
  return {
    dir: {
      input: 'templates',
      includes: '../11ty/_includes',
      layouts: '../11ty/_includes',
      data: '../11ty/_data',
    }
  }
}