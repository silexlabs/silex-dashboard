module.exports = {
  eleventyComputed: {
    frontmatter: ({collections, page, pkg, ...rest}) => rest
  }
}