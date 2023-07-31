import templatePlugin from '/js/template.js'
import eleventyPlugin from '/js/11ty.js'

export default async function(config, options) {
  // Defaults
  const opts = {
    ...options,
  }
  await config.addPlugin(templatePlugin)
  await config.addPlugin(eleventyPlugin, {
    css: {
      path: '../../pages',
      url: '/css', // Used in the permalink in liquid
    },
    html: {
      path: '../../_includes',
    },
    assets: {
      path: '../../assets',
    },
  })
}