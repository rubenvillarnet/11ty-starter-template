module.exports = (eleventyConfig) => {
  eleventyConfig.addLayoutAlias('master', 'layouts/master.hbs');

  return {
    dir: {
      input: 'src/',
      includes: '_includes',
    },
    templateFormats: ['hbs', 'png', 'jpg', 'svg'],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'hbs',
    dataTemplateEngine: 'hbs',
  };
};
