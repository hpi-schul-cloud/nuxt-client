const RICH_TEXT_TAGS = [
	"h4",
	"h5",
	"p",
	"span",
	"br",
	"strong",
	"b",
	"i",
	"em",
	"u",
	"s",
	"code",
	"sup",
	"sub",
	"mark",
	"blockquote",
	"ul",
	"ol",
	"li",
	"hr",
	"table",
	"thead",
	"tbody",
	"tr",
	"td",
	"th",
	"a",
	"figure",
];

const RICH_TEXT_ATTRS = ["class", "href", "name", "target", "style", "rel"];

export default {
	richText: {
		ALLOWED_TAGS: RICH_TEXT_TAGS,
		ALLOWED_ATTR: RICH_TEXT_ATTRS,
	},
	/** Same as richText but <a> tags are stripped (text content preserved).
	 *  Use when the surrounding element is itself an anchor to avoid nesting. */
	richTextNoLinks: {
		ALLOWED_TAGS: RICH_TEXT_TAGS.filter((t) => t !== "a"),
		ALLOWED_ATTR: RICH_TEXT_ATTRS,
	},
};
