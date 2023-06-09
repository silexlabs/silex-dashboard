const fs = require('node:fs/promises')
const { join } = require('node:path')
const express = require('express')
const node_modules = require('node_modules-path')
const serveStatic = require('serve-static')
const locale = require('locale')
const { withCache } = require('@silexlabs/silex/dist/plugins/server/plugins/server/Cache')

module.exports = async function(config, options) {
  // Defaults
  const opts = {
    defaultLanguage: 'en',
    rootPath: join(__dirname, '_site'),
    ...options,
  }

  // Detect language from browser
  const languages = JSON.parse(await fs.readFile(join(__dirname, '_data/languages.json')))

  // Serve the dashboard and the editor
  config.on('silex:startup:start', ({app}) => {
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
    editorRouter.use('/', (req, res, next) => {
      if (req.path === '/' && !req.query.id) res.redirect(`/${req.locale}/`)
      else next()
    })
    app.use(editorRouter)
  })
}