module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
  return {
    dir: {
      input: 'pages',
      includes: '../_includes',
      layouts: '../_includes',
      data: '../_data',
    }
  }
}