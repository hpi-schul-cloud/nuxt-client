import { Editor } from "@ckeditor/ckeditor5-core";
import { reactive } from "vue";
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
	fontColor: ReturnType<typeof fontColors>;
	fontBackgroundColor: ReturnType<typeof fontBackgroundColors>;
}
interface EditorWithSourceElement extends Editor {
	sourceElement?: HTMLElement;
	getData?: () => string;
}

export const useEditorConfig = () => {
	const { t, locale } = useI18n();
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const DEFAULT_PROTOCOL = "//";

	const generalConfig = reactive<GeneralConfig>({
		language: locale.value || envConfigModule.getFallbackLanguage,
		link: {
			defaultProtocol: DEFAULT_PROTOCOL,
			addTargetToExternalLinks: true,
		},
		fontColor: fontColors(t),
		fontBackgroundColor: fontBackgroundColors(t),
	});

	const containsListElement = (
		sourceElement: HTMLElement | undefined
	): boolean => {
		if (!sourceElement) return false;
		return !!sourceElement.querySelector("ul,ol");
	};

	const containsFormulaElement = (
		tempDiv: HTMLDivElement | undefined
	): boolean => {
		if (!tempDiv) return false;
		return !!tempDiv.querySelector("*:not(.math-tex):not(.katex)");
	};

	const containsTextContentElement = (
		textContent: string | null | undefined
	): boolean => {
		if (!textContent) return false;
		return !!textContent.trim();
	};
	const createTempDivFromHtml = (
		editor: EditorWithSourceElement
	): HTMLDivElement | undefined => {
		const tempDiv = document.createElement("div");
		if (!editor.getData) {
			return;
		}
		tempDiv.innerHTML = editor.getData();
		return tempDiv;
	};

	const isEditorEmpty = (editor: EditorWithSourceElement): boolean => {
		const tempDiv = createTempDivFromHtml(editor);
		return (
			!containsTextContentElement(tempDiv?.textContent) &&
			!containsFormulaElement(tempDiv) &&
			!containsListElement(editor.sourceElement)
		);
	};

	const deletionHandler = (
		evt: CKEditorEventInfo,
		data: CKEditorKeystrokeInfo,
		editor: Editor,
		onDelete: () => void
	) => {
		if (data.domEvent.key === "Backspace" || data.domEvent.key === "Delete") {
			if (isEditorEmpty(editor)) {
				onDelete();
			}
		}
	};

	const registerDeletionHandler = (editor: Editor, onDelete: () => void) => {
		editor.editing.view.document.on("keydown", (evt, data) =>
			deletionHandler(evt, data, editor, onDelete)
		);
	};

	return {
		generalConfig,
		registerDeletionHandler,
	};
};
