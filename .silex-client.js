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
      path: '../../../pages',
      url: '/css',
    },
    html: {
      path: '../../../_includes',
      url: '',
    },
    assets: {
      path: '../../..',
      url: '/',
    },
  })
}