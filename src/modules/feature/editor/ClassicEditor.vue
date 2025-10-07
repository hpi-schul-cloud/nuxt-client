<template>
	<CKEditorVue v-model="model" :editor="ClassicEditor" :config="config" @ready="handleReady" />
</template>

<script setup lang="ts">
import { mediaFormattingToolbar } from "./config";
import { useEditorConfig } from "./EditorConfig.composable";
import { Editor, EditorConfig } from "@ckeditor/ckeditor5-core";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { Math } from "@isaul32/ckeditor5-math";
import {
	Autoformat,
	Bold,
	ClassicEditor,
	Essentials,
	FontBackgroundColor,
	FontColor,
	Heading,
	Italic,
	List,
	Paragraph,
	RemoveFormat,
	Strikethrough,
} from "ckeditor5";
import { computed, PropType } from "vue";

const props = defineProps({
	type: {
		type: String as PropType<"classic" | "inline">,
		default: "classic",
	},
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
});

const emit = defineEmits<{
	(e: "ready"): void;
	(e: "keyboard:delete"): void;
}>();

const CKEditorVue = CKEditor.component;
const { generalConfig, registerDeletionHandler } = useEditorConfig();

const model = defineModel<string>("value");

const config = computed<EditorConfig>(() => ({
	// ...generalConfig,
	toolbar: {
		items: mediaFormattingToolbar,
	},
	plugins: [
		Autoformat,
		Bold,
		Essentials,
		FontBackgroundColor,
		FontColor,
		Heading,
		Italic,
		List,
		Math,
		Paragraph,
		RemoveFormat,
		Strikethrough,
	],
	// heading: prominentHeadings,
	placeholder: props.placeholder,
}));

const handleReady = (editor: Editor) => {
	emit("ready");

	if (props.autofocus) {
		editor.editing.view.focus();
	}

	registerDeletionHandler(editor, () => emit("keyboard:delete"));
};
</script>

<style lang="scss">
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";

.ck-content {
	ul,
	ol {
		padding-left: revert !important;
	}
}

.ck-blurred {
	border: none !important;
}

.ck-focused {
	border: none !important;
	box-shadow: none !important;
}

// TODO - remove important when CKEditor 5 is updated or adjusted to a version that supports custom styles with vite
// https://github.com/ckeditor/ckeditor5/issues/13709
// https://ckeditor.com/docs/ckeditor5/latest/getting-started/legacy/advanced/alternative-setups/integrating-from-source-vite.html
.ck.ck-toolbar,
.ck.ck-sticky-panel__content {
	border: none !important;
}
</style>
