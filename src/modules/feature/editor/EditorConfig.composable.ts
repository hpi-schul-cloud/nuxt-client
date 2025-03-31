import { Editor } from "@ckeditor/ckeditor5-core";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import {
	corePlugins,
	advancedPlugins,
	basicFormattingToolbar,
	advancedFormattingToolbar,
	basicFormattingMediaToolbar,
	compactHeadings,
	prominentHeadings,
	fontColors,
	fontBackgroundColors,
} from "./config";

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

	const generalConfig = reactive({
		language: locale.value, // or fallback language
		link: {
			defaultProtocol: "//",
			addTargetToExternalLinks: true,
		},
		wordCount: {
			onUpdate: (data: { words: number; characters: number }) => {
				charCount.value = data.characters;
			},
		},
		fontColor: fontColors(t),
		fontBackgroundColor: fontBackgroundColors(t),
	});

	const editorIsEmpty = computed(() => {
		return charCount.value === 0;
	});

	const deletionHandler = (
		evt: CKEditorEventInfo,
		data: CKEditorKeystrokeInfo,
		onDelete: () => void
	) => {
		if (data.domEvent.key === "Backspace" || data.domEvent.key === "Delete") {
			if (editorIsEmpty.value) {
				onDelete();
			}
		}
	};

	const registerDeletionHandler = (editor: Editor, onDelete: () => void) => {
		editor.editing.view.document.on("keydown", (evt, data) =>
			deletionHandler(evt, data, onDelete)
		);
	};

	return {
		corePlugins,
		advancedPlugins,
		basicFormattingToolbar,
		advancedFormattingToolbar,
		basicFormattingMediaToolbar,
		compactHeadings,
		prominentHeadings,
		generalConfig,
		editorIsEmpty,
		registerDeletionHandler,
	};
};
