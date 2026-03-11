const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images');

  // Human-readable date: "January 15, 2025"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  // ISO date for <time datetime="">
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });

  // Limit filter — e.g. for showing only top N posts
  eleventyConfig.addFilter("limit", (array, n) => array.slice(0, n));

  return {
    pathPrefix: "/parth-posts/",
    dir: {
      input:    'src',
      output:   '_site',
      includes: '_includes'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine:     'njk'
  };
};