PostCSS Markdown Syntax
====

[![NPM version](https://img.shields.io/npm/v/postcss-markdown.svg?style=flat-square)](https://www.npmjs.com/package/postcss-markdown)
[![Travis](https://img.shields.io/travis/gucong3000/postcss-markdown.svg)](https://travis-ci.org/gucong3000/postcss-markdown)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/postcss-markdown.svg)](https://codecov.io/gh/gucong3000/postcss-markdown)
[![David](https://img.shields.io/david/gucong3000/postcss-markdown.svg)](https://david-dm.org/gucong3000/postcss-markdown)

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo.svg">

[PostCSS](https://github.com/postcss/postcss) Syntax for parsing [Markdown](https://daringfireball.net/projects/markdown/syntax)

## Getting Started

First thing's first, install the module:

```
npm install postcss-html postcss-markdown --save-dev
```

If you want support SCSS/SASS/LESS/SugarSS syntax, you need to install the corresponding module.

- SCSS: [PostCSS-SCSS](https://github.com/postcss/postcss-scss)
- SASS: [PostCSS-SASS](https://github.com/aleshaoleg/postcss-sass)
- LESS: [PostCSS-LESS](https://github.com/shellscape/postcss-less)
- SugarSS: [SugarSS](https://github.com/postcss/sugarss)

## Use Cases

```js
var syntax = require('postcss-markdown');
var autoprefixer = require('autoprefixer');
postcss([ autoprefixer ]).process(source, { syntax: syntax }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```
input:
<pre><code># title

```css
::placeholder {
  color: gray;
}
```
</code></pre>


output:
<pre><code># title

```css
::-webkit-input-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}
```
</code></pre>

### Style Transformations

The main use case of this plugin is to apply PostCSS transformations to code blocks in markdown file.

### Custom unknown syntax

```js
var syntax = require('postcss-markdown');
postcss(plugins).process(md, {
	syntax: syntax({
		stylus: require('postcss-stylus')
	})
}).then(function (result) {
	result.content
});
```
