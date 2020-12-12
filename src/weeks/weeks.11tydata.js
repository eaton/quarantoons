module.exports = {
  layout: "week",
  permalink: "/week-{{week}}/",
  eleventyComputed: {
     fallbackTitle: data => `Week ${data.week}`
  }
}
