import templatePlugin from '/node_modules/@silexlabs/silex/dist/plugins/client/plugins/client/template.js'
import publicationRenderer from '/node_modules/@silexlabs/silex/dist/plugins/client/plugins/client/publicationRenderer.js'

export default async function(config, options) {
  // Defaults
  const opts = {
    ...options,
  }
  await config.addPlugin(templatePlugin)
  await config.addPlugin(publicationRenderer, {
    css: {
      frontMatter: true,
      ext: '.css.liquid',
      path: '../../../pages'
    },
    html: {
      frontMatter: false,
      path: '../../../_includes'
    },
    assets: {
      path: '../../../',
      url: '/',
    },
  })
}