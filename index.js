const fs = require('node:fs/promises')
const { join } = require('node:path')
const express = require('express')
const serveStatic = require('serve-static')

function getBrowserLanguage(languages) {
  console.log({ languages })
  return //navigator.languages.find((lang) => languages.includes(lang))
}

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

  config.on('silex:startup:start', ({app}) => {
    // Serve the dashboard
    const dashRouter = express.Router()
    dashRouter.use('/', serveStatic(opts.rootPath))
    app.use(withCache,  dashRouter)
    // Serve the editor when the ?id param is present in the URL
    const editorRouter = express.Router()
    editorRouter.use('/', (req, res, next) => {
      if (req.url === '/' && !req.query.id) res.redirect('/en/')
      else next()
    })
    app.use(editorRouter)
  })

  // Detect language from browser
  const languages = JSON.parse(await fs.readFile(join(__dirname, '_data/languages.json')))
  const language = getBrowserLanguage(languages) ?? opts.defaultLanguage
  console.log({ language })

}