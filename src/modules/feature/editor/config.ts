type ToolbarItem = string;
type PluginName = string;

interface FontColor {
	color: string;
	label: string;
}

export const corePlugins: PluginName[] = [
	"FontBackgroundColor",
	"FontColor",
	"Autoformat",
	"Bold",
	"Essentials",
	"Heading",
	"Italic",
	"List",
	"Paragraph",
	"RemoveFormat",
	"Strikethrough",
];

export const advancedPlugins: PluginName[] = [
	...corePlugins,
	"FontBackgroundColor",
	"FontColor",
	"HorizontalLine",
	"Link",
	"Math",
	"SpecialCharacters",
	"SpecialCharactersEssentials",
	"Subscript",
	"Superscript",
	"Table",
	"TableToolbar",
	"WordCount",
];

export const advancedFormattingToolbar: ToolbarItem[] = [
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

export const mediaFormattingToolbar: ToolbarItem[] = [
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

export const fontColors = (
	t: (key: string) => string
): { colors: FontColor[] } => ({
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

export const fontBackgroundColors = (
	t: (key: string) => string
): { colors: FontColor[] } => ({
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
