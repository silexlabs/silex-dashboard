import SilexCms from './js/silex-cms/client.js'

export default async function (config, options) {
  // Defaults
  const opts = {
    ...options,
  }
  config.addPlugin(SilexCms, {
    dataSources: [{
      id: 'tina',
      type: 'graphql',
      name: 'Tina (Local Files)',
      url: 'http://localhost:4001/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }],
    imagePlugin: false,
    i18nPlugin: true,
    cacheBuster: false,
  })
}
