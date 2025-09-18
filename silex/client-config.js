export default async function (config, options) {
  config.cmsConfig = {
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
    fetchPlugin: false,
  }
}
