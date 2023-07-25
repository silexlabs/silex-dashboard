import templatePlugin from '/node_modules/@silexlabs/silex/dist/plugins/client/plugins/client/template.js'
import eleventyPlugin from '/node_modules/@silexlabs/silex/dist/plugins/client/plugins/client/11ty.js'

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