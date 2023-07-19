const fs = require('node:fs/promises')
const { join } = require('node:path')
const express = require('express')
const node_modules = require('node_modules-path')
const serveStatic = require('serve-static')
const locale = require('locale')
const { withCache } = require('@silexlabs/silex/dist/plugins/server/plugins/server/Cache')
const { ServerEvent } = require('@silexlabs/silex').events

const { ConnectorType } = require('@silexlabs/silex/dist/server/types')
const FtpConnector = require('@silexlabs/silex/dist/plugins/server/plugins/server/FtpConnector').default
const GitlabConnector = require('@silexlabs/silex/dist/plugins/server/plugins/server/GitlabConnector').default
const {FsStorage} = require('@silexlabs/silex/dist/server/server/connectors/FsStorage')
const {FsHosting} = require('@silexlabs/silex/dist/server/server/connectors/FsHosting')

module.exports = async function(config, options) {
  // Defaults
  const opts = {
    defaultLanguage: 'en',
    rootPath: join(__dirname, '_site'),
    ...options,
  }

  config.addHostingConnector([
    new FsHosting(config, {
      path: process.env.SILEX_FS_ROOT,
    }),
    new FtpConnector(config, {
      type: ConnectorType.HOSTING,
    }),
  ])

  //config.addStorageConnector([
  //  //new FsStorage(config, {
  //  //  path: process.env.SILEX_FS_ROOT,
  //  //}),
  //  new FtpConnector(config, {
  //    type: ConnectorType.STORAGE,
  //  }),
  //  new GitlabConnector(config, {
  //    clientId: process.env.GITLAB_CLIENT_ID,
  //    clientSecret: process.env.GITLAB_CLIENT_SECRET,
  //  }),
  //])

  // Detect language from browser
  const languages = JSON.parse(await fs.readFile(join(__dirname, '_data/languages.json')))

  // Serve the dashboard and the editor
  config.on(ServerEvent.STARTUP_START, ({app}) => {
    const router = express.Router()
    app.use(router)

    // Use cache
    router.use(withCache)

    // Localization populate req.locale
    router.use(locale(languages.map(l => l.code), opts.defaultLanguage))

    // Serve the dashboard
    router.use('/', serveStatic(opts.rootPath))

    // Serve scripts
    //router.use('/js/vue/', express.static(node_modules('vue') + '/vue'))
    //router.use('/js/@silexlabs/silex/', express.static(node_modules('@silexlabs/silex') + '/@silexlabs/silex'))
    router.use('/', express.static(join(__dirname, 'public')))

    // Serve the editor when the ?id param is present in the URL
    const editorRouter = express.Router()
    console.log('dashboard route /', {opts})
    editorRouter.use('/', (req, res, next) => {
      console.log('dashboard route / called', req.path, req.query.id, req.locale)
      if (req.path === '/' && !req.query.id) res.redirect(`/${req.locale}/`)
      else next()
    })
    app.use(editorRouter)
  })
}