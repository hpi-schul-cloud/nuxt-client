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

	function isEditorEmpty(
		editor: Editor & { sourceElement?: HTMLElement; getData?: () => string }
	): boolean {
		const data = editor.getData ? editor.getData() : "";
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = data;
		const containsTextContent = !!tempDiv.textContent?.trim();
		const containsFormula = !!tempDiv.querySelector(
			"*:not(.math-tex):not(.katex)"
		);
		const containsList = !!editor.sourceElement?.querySelector("ul,ol");
		return !containsTextContent && !containsFormula && !containsList;
	}

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
