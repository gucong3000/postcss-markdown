"use strict";

const expect = require("chai").expect;
const syntax = require("../");

describe("markdown tests", () => {
	it("CSS", () => {
		const md = [
			"---",
			"title: Something Special",
			"---",
			"Here is some text.",
			"```css",
			".foo {}",
			"```",
			"And some other text.",
			"```css",
			"    .foo { color: pink; }",
			"      .bar {}",
			"```",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"```scss",
			"// Parser-breaking comment",
			"$foo: bar;",
			".foo {}",
			"```",
			"```js",
			"<style>",
			"js {}",
			"</style>",
			"```",
			"```html",
			"<style>",
			"html {}",
			"</style>",
			"```",
			"And the end.",
		].join("\n");
		const document = syntax({
			html: true,
		}).parse(md, {
			from: "markdown.md",
		});
		expect(document.source).to.haveOwnProperty("lang", "markdown");
		expect(document.nodes).to.have.lengthOf(5);
		expect(document.toString()).to.equal(md);
	});

	it("empty code block", () => {
		const source = [
			"hi",
			"",
			"```css",
			"",
			"```",
			"",
		].join("\n");
		const document = syntax.parse(source, {
			from: "empty_code_block.md",
		});
		expect(document.source).to.haveOwnProperty("lang", "markdown");
		expect(document.nodes).to.have.lengthOf(1);
		const css = document.first.source;
		expect(css.lang).equal("css");
		expect(css.input.css).equal("\n");
		expect(css.start.line).equal(4);
		expect(css.start.column).equal(1);
	});

	it("empty file", () => {
		const document = syntax.parse("", {
			from: "empty_file.md",
		});
		expect(document.source).to.haveOwnProperty("lang", "markdown");
		expect(document.nodes).have.lengthOf(0);
		expect(document.toString()).to.equal("");
	});

	it("without code blocks", () => {
		const document = syntax.parse("# Hi\n", {
			from: "without_code_blocks.md",
		});
		expect(document.source).to.haveOwnProperty("lang", "markdown");
		expect(document.nodes).to.have.lengthOf(0);
		expect(document.toString()).to.equal("# Hi\n");
	});
});
