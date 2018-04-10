"use strict";

const parser = require("./parser");

function parse (source, opts) {
	if (!opts.syntax) {
		opts.syntax = this;
	}
	return parser(source, opts);
}

module.exports = parse;
