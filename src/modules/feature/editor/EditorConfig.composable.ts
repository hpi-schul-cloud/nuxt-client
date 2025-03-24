import { useI18n } from "vue-i18n";

export const useEditorConfig = () => {
	const { t } = useI18n();

	const boardToolbarSimple = [
		"heading",
		"|",
		"bold",
		"italic",
		"highlight",
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
		"highlight",
		"code",
		"superscript",
		"subscript",
		"|",
		"link",
		"bulletedList",
		"numberedList",
		"math",
		"horizontalLine",
		"|",
		"blockQuote",
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
		"BlockQuote",
		"Bold",
		"Code",
		"Essentials",
		"Heading",
		"Highlight",
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

	const highlights = [
		{
			model: "dullPinkMarker",
			class: "marker-dull-pink",
			title: t("components.editor.highlight.dullPink"),
			color: "var(--ck-highlight-marker-dull-pink)",
			type: "marker",
		},
		{
			model: "pinkMarker",
			class: "marker-pink",
			title: "Pink marker",
			color: "var(--ck-highlight-marker-pink)",
			type: "marker",
		},
		{
			model: "dullYellowMarker",
			class: "marker-dull-yellow",
			title: t("components.editor.highlight.dullYellow"),
			color: "var(--ck-highlight-marker-dull-yellow)",
			type: "marker",
		},
		{
			model: "yellowMarker",
			class: "marker-yellow",
			title: "Yellow marker",
			color: "var(--ck-highlight-marker-yellow)",
			type: "marker",
		},
		{
			model: "dullBlueMarker",
			class: "marker-dull-blue",
			title: t("components.editor.highlight.dullBlue"),
			color: "var(--ck-highlight-marker-dull-blue)",
			type: "marker",
		},
		{
			model: "blueMarker",
			class: "marker-blue",
			title: "Blue marker",
			color: "var(--ck-highlight-marker-blue)",
			type: "marker",
		},
		{
			model: "dullGreenMarker",
			class: "marker-dull-green",
			title: t("components.editor.highlight.dullGreen"),
			color: "var(--ck-highlight-marker-dull-green)",
			type: "marker",
		},
		{
			model: "greenMarker",
			class: "marker-green",
			title: "Green marker",
			color: "var(--ck-highlight-marker-green)",
			type: "marker",
		},
	];

	return {
		boardToolbarSimple,
		boardToolbarRegular,
		newsToolbar,
		boardPlugins,
		newsPlugins,
		boardHeadings,
		newsHeadings,
		highlights,
	};
};
