"use strict";

const Input = require("postcss/lib/input");
const Document = require("postcss-html/lib/document");
const docFixer = require("postcss-html/lib/parse-style");
const htmlParser = require("postcss-html/lib/html-parser");
const mdParser = require("./md-parser");

function parser (source, opts) {
	source = source && source.toString();

	const styleMd = mdParser(htmlParser(source, opts) || [], source, opts);

	const document = new Document();

	let index = 0;
	if (styleMd.length) {
		const parseStyle = docFixer(source, opts);
		styleMd.sort((a, b) => {
			return a.startIndex - b.startIndex;
		}).forEach(style => {
			const root = parseStyle(style);
			root.raws.beforeStart = source.slice(index, style.startIndex);
			index = style.startIndex + style.content.length;
			document.nodes.push(root);
		});
	}
	document.raws.afterEnd = index ? source.slice(index) : source;
	document.source = {
		input: new Input(source, opts),
		start: {
			line: 1,
			column: 1,
		},
	};

	return document;
}

module.exports = parser;
