const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(pluginRss)

    // Markdown
    eleventyConfig.setLibrary(
        'md',
        markdownIt({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true
        })
    )

    // Layouts
    eleventyConfig.addLayoutAlias('base',  'base.njk')
    eleventyConfig.addLayoutAlias('page',  'base.njk')
    eleventyConfig.addLayoutAlias('party', 'party.njk')
    eleventyConfig.addLayoutAlias('post',  'post.njk')

    // Pass-through files
    eleventyConfig.addPassthroughCopy('src/static')
    eleventyConfig.addPassthroughCopy('src/admin')

    // Deep-Merge
    eleventyConfig.setDataDeepMerge(true)

    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data'
        },
        templateFormats: ['njk', 'md', '11ty.js'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
}
