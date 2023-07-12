import templatePlugin from '/node_modules/@silexlabs/silex/dist/plugins/client/plugins/client/template.js'
import publishTo from '/node_modules/@silexlabs/silex/dist/plugins/client/plugins/client/publicationRenderer.js'

export default async function(config, options) {
  console.log('silex-client.js', templatePlugin)
  // Defaults
  const opts = {
    ...options,
  }
  await config.addPlugin(templatePlugin)
  await config.addPlugin(publishTo, {
    publishTo: 'https://silex.me/publish',
    css: {
      frontMatter: true,
      ext: '.css.liquid',
      path: '../../pages'
    },
    html: {
      frontMatter: false,
      path: '../../_includes'
    },
    assets: {
      path: '../../',
      url: '/',
    },
  })
}