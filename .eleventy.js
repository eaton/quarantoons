const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')
const video = require('./util/video.js')
const { DateTime, Interval } = require("luxon");

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
	eleventyConfig.addLayoutAlias('week',  'week.njk')
	eleventyConfig.addLayoutAlias('post',  'post.njk')

	eleventyConfig.addCollection("weeks", function(collectionApi) {
		return collectionApi.getFilteredByGlob("./src/weeks/*.md").sort(function(a, b) {
			return b.week - a.week;
		});
	});

	eleventyConfig.addCollection("posts", function(collectionApi) {
		return collectionApi.getFilteredByGlob("./src/posts/*.md");
	});

	// Date formatting (human readable)
	eleventyConfig.addFilter("ofMarch", dateObj => {
	  let intv = Interval.fromDateTimes(DateTime.fromObject({ year: 2020, month: 2, day: 28}), DateTime.fromJSDate(dateObj));
		return Math.ceil(intv.toDuration('days').as('days'));
	});

	eleventyConfig.addFilter("clipData", clips => {
		return video.dataFromClipCollection(clips);
	});


	eleventyConfig.addFilter("ordinal", n => {
		var s = ["th", "st", "nd", "rd"],
				v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	});


	// Pass-through files
	eleventyConfig.addPassthroughCopy('src/static')
	eleventyConfig.addPassthroughCopy('src/admin')
	
	eleventyConfig.addWatchTarget('src/static')
	eleventyConfig.addWatchTarget('util')

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
