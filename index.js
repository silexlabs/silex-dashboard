const fs = require('node:fs/promises')
const { join } = require('node:path')
const express = require('express')
const serveStatic = require('serve-static')
const locale = require('locale')

function withCache(req, res, next) {
  res.header('Cache-Control', 'public,max-age=86400,immutable') // 24h
  next()
}

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
    // Serve the dashboard
    const dashRouter = express.Router()
    dashRouter.use(locale(languages.map(l => l.code), opts.defaultLanguage))
    dashRouter.use('/', serveStatic(opts.rootPath))
    app.use(withCache,  dashRouter)

    // Serve the editor when the ?id param is present in the URL
    const editorRouter = express.Router()
    editorRouter.use('/', (req, res, next) => {
      if (req.path === '/' && !req.query.id) res.redirect(`/${req.locale}/`)
      else next()
    })
    app.use(editorRouter)
  })
}