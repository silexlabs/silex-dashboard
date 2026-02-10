const { join, dirname } = require('node:path')
const express = require('express')
const { ServerEvent } = require('@silexlabs/silex').events

module.exports = async function(config, options) {
  console.log('> Silex dashboard plugin starting', {options})

  // Resolve the dashboard public/ directory from the npm dependency
  const defaultRoot = join(dirname(require.resolve('@silexlabs/silex-dashboard-2026/package.json')), 'public')

  const opts = {
    rootPath: defaultRoot,
    ...options,
  }

  config.on(ServerEvent.STARTUP_START, ({app}) => {
    const router = express.Router()

    // When ?id= is present, skip the dashboard (let the editor handle it)
    router.use('/', (req, res, next) => {
      if (req.path === '/' && req.query.id) return next('router')
      next()
    })

    // Serve dashboard static files
    router.use('/', express.static(opts.rootPath))

    app.use(router)
  })
}
