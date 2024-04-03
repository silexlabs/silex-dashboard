import SilexCms from './js/silex-cms/client.js'

export default async function (config, options) {
  // Defaults
  const opts = {
    ...options,
  }
  config.addPlugin(SilexCms, {
    dataSources: [],
    imagePlugin: false,
    i18nPlugin: false,
    enable11ty: false,
    view: {
      disableStates: true,
      disableAttributes: false,
      disableProperties: false,
    },
  })
}
