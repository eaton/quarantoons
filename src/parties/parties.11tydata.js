module.exports = {
  layout: "party",
  permalink: false,
  eleventyComputed: {
    title: data => 'Week ${data.week}.',
  }
};
