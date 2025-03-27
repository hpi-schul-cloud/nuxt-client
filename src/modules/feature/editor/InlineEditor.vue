<template>
	<CKEditor.component
		v-model="modelValue"
		:editor="InlineEditor"
		:config="config"
		data-testid="ckeditor"
		@blur="handleBlur"
		@focus="handleFocus"
		@ready="handleReady"
	/>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { computed } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { Editor } from "@ckeditor/ckeditor5-core";
import { InlineEditor } from "@hpi-schul-cloud/ckeditor";
import { useEditorConfig } from "./EditorConfig.composable";

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

const props = defineProps({
	value: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	autofocus: {
		type: Boolean,
	},
	viewportOffsetTop: {
		type: Number,
		default: 0,
	},
});

const emit = defineEmits([
	"ready",
	"focus",
	"update:value",
	"blur",
	"keyboard",
	"keyboard:delete",
]);

const {
	generalConfig,
	compactHeadings,
	boardPlugins,
	inlineEditorToolbarItems,
	editorIsEmpty,
} = useEditorConfig();

const modelValue = useVModel(props, "value", emit);

const config = computed(() => {
	return {
		...generalConfig,
		toolbar: {
			items: inlineEditorToolbarItems,
		},
		plugins: boardPlugins,
		heading: compactHeadings,
		placeholder: props.placeholder,
		ui: {
			viewportOffset: {
				top: props.viewportOffsetTop,
			},
		},
	};
});

const handleFocus = () => emit("focus");
const handleBlur = () => emit("blur");
const handleDelete = () => {
	if (editorIsEmpty.value) {
		emit("keyboard:delete");
	}
};

const handleReady = (editor: Editor) => {
	emit("ready");

	if (props.autofocus) {
		editor.editing.view.focus();
	}

	// attach additional event listener not provided by vue wrapper itself
	// for more infos on editor instance, see https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
	editor.editing.view.document.on(
		"keydown",
		(evt: CKEditorEventInfo, data: CKEditorKeystrokeInfo) => {
			if (data.domEvent.key === "Backspace" || data.domEvent.key === "Delete") {
				handleDelete();
			}
		}
	);
};
</script>

<style lang="scss">
@import "@/styles/settings.scss";
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";

:root {
	// z-index must be less than z-index of the headers to prevent that the toolbar is shown in front of the headers when scrolling.
	--ck-z-modal: 15;
}

.ck-content {
	ul,
	ol {
		padding-left: revert;
	}
}

.ck-blurred {
	border: none !important;
}

.ck-focused {
	border: none !important;
	box-shadow: none !important;
}

@media #{map-get($display-breakpoints, "sm-and-up")} {
	.ck.ck-toolbar_floating {
		min-width: 460px;
	}
}

.ck-math-tex {
	font-size: large;
}
</style>
