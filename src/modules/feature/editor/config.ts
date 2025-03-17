const boardToolbarSimple = [
	"heading",
	"|",
	"bold",
	"italic",
	"|",
	"link",
	"bulletedList",
	"numberedList",
	"removeFormat",
];

const boardToolbarRegular = [
	"undo",
	"redo",
	"|",
	"heading",
	"|",
	"bold",
	"italic",
	"strikethrough",
	"fontColor",
	"fontBackgroundColor",
	"superscript",
	"subscript",
	"|",
	"link",
	"bulletedList",
	"numberedList",
	"todoList",
	"math",
	"horizontalLine",
	"|",
	"insertTable",
	"specialCharacters",
	"removeFormat",
];

const newsToolbar = [
	"undo",
	"redo",
	"|",
	"heading",
	"|",
	"bold",
	"italic",
	"strikethrough",
	"|",
	"bulletedList",
	"numberedList",
	"removeFormat",
	"|",
	"insertImage",
];

const boardPlugins = [
	"Autoformat",
	"Bold",
	"Essentials",
	"FontColor",
	"FontBackgroundColor",
	"Heading",
	"HorizontalLine",
	"Italic",
	"Link",
	"List",
	"Math",
	"Paragraph",
	"RemoveFormat",
	"SpecialCharacters",
	"Strikethrough",
	"Subscript",
	"Superscript",
	"Table",
	"TableToolbar",
	"TodoList",
	"WordCount",
];

const newsPlugins = [
	"Autoformat",
	"Bold",
	"Essentials",
	"Heading",
	"Image",
	"ImageInsertViaUrl",
	"Italic",
	"List",
	"Paragraph",
	"RemoveFormat",
	"Strikethrough",
];

const boardHeadings = {
	options: [
		{
			model: "paragraph",
			title: "Paragraph",
			class: "ck-heading_paragraph",
		},
		{
			model: "heading1",
			view: "h4",
			title: "Heading 1",
			class: "ck-heading_heading1",
		},
		{
			model: "heading2",
			view: "h5",
			title: "Heading 2",
			class: "ck-heading_heading2",
		},
	],
};

const newsHeadings = {
	options: [
		{
			model: "paragraph",
			title: "Paragraph",
			class: "ck-heading_paragraph",
		},
		{
			model: "heading1",
			view: "h2",
			title: "Heading 1",
			class: "ck-heading_heading1",
		},
		{
			model: "heading2",
			view: "h3",
			title: "Heading 2",
			class: "ck-heading_heading2",
		},
		{
			model: "heading3",
			view: "h4",
			title: "Heading 3",
			class: "ck-heading_heading3",
		},
	],
};

export {
	boardToolbarSimple,
	boardToolbarRegular,
	newsToolbar,
	boardPlugins,
	newsPlugins,
	boardHeadings,
	newsHeadings,
};
