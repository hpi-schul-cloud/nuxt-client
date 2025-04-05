import { Editor } from "@ckeditor/ckeditor5-core";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { fontColors, fontBackgroundColors } from "./config";
import { injectStrict } from "@/utils/inject/inject-strict";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject/injection-keys";

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

interface GeneralConfig {
	language: string;
	link: {
		defaultProtocol: string;
		addTargetToExternalLinks: boolean;
	};
	wordCount: {
		onUpdate: (data: { words: number; characters: number }) => void;
	};
	fontColor: ReturnType<typeof fontColors>;
	fontBackgroundColor: ReturnType<typeof fontBackgroundColors>;
}

export const useEditorConfig = () => {
	const { t, locale } = useI18n();
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const DEFAULT_PROTOCOL = "//";

	const charCount = ref(0);

	const generalConfig = reactive<GeneralConfig>({
		language: locale.value || envConfigModule.getFallbackLanguage,
		link: {
			defaultProtocol: DEFAULT_PROTOCOL,
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
		generalConfig,
		editorIsEmpty,
		registerDeletionHandler,
	};
};
