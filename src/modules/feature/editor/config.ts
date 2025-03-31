export const corePlugins = [
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

export const extendedPlugins = [
	"Autoformat",
	"Bold",
	"Essentials",
	"FontBackgroundColor",
	"FontColor",
	"Heading",
	"HorizontalLine",
	"Italic",
	"Link",
	"List",
	"Math",
	"Paragraph",
	"RemoveFormat",
	"SpecialCharacters",
	"SpecialCharactersEssentials",
	"Strikethrough",
	"Subscript",
	"Superscript",
	"Table",
	"TableToolbar",
	"WordCount",
];

export const balloonEditorToolbarItems = [
	"heading",
	"|",
	"bold",
	"italic",
	"fontBackgroundColor",
	"|",
	"link",
	"bulletedList",
	"numberedList",
	"removeFormat",
];

export const inlineEditorToolbarItems = [
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
	"math",
	"horizontalLine",
	"|",
	"insertTable",
	"specialCharacters",
	"removeFormat",
];

export const classicEditorToolbarItems = [
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

export const compactHeadings = {
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

export const prominentHeadings = {
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

export const fontColors = (t: (key: string) => string) => ({
	colors: [
		{ color: "#827717", label: t("components.editor.fonts.colors.oliveGreen") },
		{ color: "#388E3C", label: "Green" },
		{ color: "#00838F", label: "Turquoise" },
		{ color: "#1976D2", label: "Blue" },
		{ color: "#3F51B5", label: t("components.editor.fonts.colors.indigo") },
		{ color: "#673AB7", label: t("components.editor.fonts.colors.darkPurple") },
		{ color: "#9C27B0", label: "Purple" },
		{ color: "#D81B60", label: t("components.editor.fonts.colors.pink") },
		{ color: "#D32F2F", label: "Red" },
	],
});

export const fontBackgroundColors = (t: (key: string) => string) => ({
	colors: [
		{ color: "#DCEDC8", label: "Light green" },
		{ color: "#C8E6C9", label: "Green" },
		{ color: "#B2EBF2", label: "Turquoise" },
		{ color: "#BBDEFB", label: "Blue" },
		{ color: "#C5CAE9", label: t("components.editor.fonts.colors.indigo") },
		{ color: "#E1BEE7", label: t("components.editor.fonts.colors.darkPurple") },
		{ color: "#F8BBD0", label: t("components.editor.fonts.colors.pink") },
		{ color: "#FFCCBC", label: "Orange" },
		{ color: "#FFECB3", label: "Yellow" },
	],
});
