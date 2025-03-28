import { Editor } from "@ckeditor/ckeditor5-core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type CKEditorKeystrokeInfo = {
	keyCode: number;
	keystroke: number;
	domEvent: KeyboardEvent;
	domTarget: HTMLElement;
	altKey: boolean;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean;
	view: unknown;
	document: unknown;
};

type CKEditorEventInfo = {
	name: string;
	source: unknown;
	stop?: () => void;
};

export const useEditorConfig = () => {
	const { t, locale } = useI18n();

	const charCount = ref(0);

	const corePlugins = [
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

	const extendedPlugins = [
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

	const balloonEditorToolbarItems = [
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

	const inlineEditorToolbarItems = [
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

	const classicEditorToolbarItems = [
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

	const compactHeadings = {
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

	const prominentHeadings = {
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

	// Using the following colors from the vuetify color palette:
	// lime-darken-4, green-darken-2, cyan-darken-3, blue-darken-2, indigo, deep-purple, purple, pink-darken-1, red-darken-2
	// Some colors are translated by CKEditor itself
	const fontColors = {
		colors: [
			{
				color: "#827717",
				label: t("components.editor.fonts.colors.oliveGreen"),
			},
			{ color: "#388E3C", label: "Green" },
			{ color: "#00838F", label: "Turquoise" },
			{ color: "#1976D2", label: "Blue" },
			{
				color: "#3F51B5",
				label: t("components.editor.fonts.colors.indigo"),
			},
			{
				color: "#673AB7",
				label: t("components.editor.fonts.colors.darkPurple"),
			},
			{ color: "#9C27B0", label: "Purple" },
			{
				color: "#D81B60",
				label: t("components.editor.fonts.colors.pink"),
			},
			{ color: "#D32F2F", label: "Red" },
		],
	};

	// Using the following colors from the vuetify color palette:
	// light-green-lighten-4, green-lighten-4, cyan-lighten-4, blue-lighten-4, indigo-lighten-4, purple-lighten-4, pink-lighten-4, deep-orange-lighten-4, amber-lighten-4
	// Some colors are translated by CKEditor itself
	const fontBackgroundColors = {
		colors: [
			{ color: "#DCEDC8", label: "Light green" },
			{ color: "#C8E6C9", label: "Green" },
			{ color: "#B2EBF2", label: "Turquoise" },
			{ color: "#BBDEFB", label: "Blue" },
			{
				color: "#C5CAE9",
				label: t("components.editor.fonts.colors.indigo"),
			},
			{
				color: "#E1BEE7",
				label: t("components.editor.fonts.colors.darkPurple"),
			},
			{
				color: "#F8BBD0",
				label: t("components.editor.fonts.colors.pink"),
			},
			{ color: "#FFCCBC", label: "Orange" },
			{
				color: "#FFECB3",
				label: "Yellow",
			},
		],
	};

	const generalConfig = computed(() => {
		return {
			language: locale.value,
			link: {
				defaultProtocol: "//",
				addTargetToExternalLinks: true,
			},
			wordCount: {
				onUpdate: (data: { words: number; characters: number }) => {
					charCount.value = data.characters;
				},
			},
			fontColor: fontColors,
			fontBackgroundColor: fontBackgroundColors,
		};
	});

	const editorIsEmpty = computed(() => {
		return charCount.value === 0;
	});

	const attachDeletionHandler = (editor: Editor, onDelete: () => void) => {
		// attach additional event listener not provided by vue wrapper itself
		// for more infos on editor instance, see https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
		editor.editing.view.document.on(
			"keydown",
			(evt: CKEditorEventInfo, data: CKEditorKeystrokeInfo) => {
				if (
					data.domEvent.key === "Backspace" ||
					data.domEvent.key === "Delete"
				) {
					if (editorIsEmpty.value) {
						onDelete();
					}
				}
			}
		);
	};

	return {
		corePlugins,
		extendedPlugins,
		balloonEditorToolbarItems,
		inlineEditorToolbarItems,
		classicEditorToolbarItems,
		compactHeadings,
		prominentHeadings,
		generalConfig,
		editorIsEmpty,
		attachDeletionHandler,
	};
};
