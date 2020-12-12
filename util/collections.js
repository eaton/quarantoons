/*

  Big ol' export of all the collections used by the site. Functions follow
  the basic form:

  collectionApi
  .getAll()
  .filter(item => item.url
         && ! item.inputPath.includes('index.njk')
         && item.inputPath.startsWith('./src/articles/')))

  Alternatives for populating the initial collection include getAll(), getAllSorted(),
  getFilteredByTag(tagName), and getFilteredByGlob(glob).
  
  Valid collection item properties include inputPath, outputPath, fileSlug, date, url,
  template, templateContent, and data (aka frontmatter vars).
  
  https://globster.xyz for testing
*/

module.exports = {
  parties: function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/parties/*.md").sort(function(a, b) {
      return b.week - a.week;
    });
  },
  
  posts: function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/*.md");
  }
}