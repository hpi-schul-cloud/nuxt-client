<template>
	<CKEditorVue
		ref="ck"
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
import { advancedFormattingToolbar, advancedPlugins, compactHeadings } from "./config";
import { useEditorConfig } from "./EditorConfig.composable";
import { Editor } from "@ckeditor/ckeditor5-core";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { InlineEditor } from "@hpi-schul-cloud/ckeditor";
import { useVModel } from "@vueuse/core";
import katex from "katex";
import { computed, ref } from "vue";
(window as Window).katex = katex;

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

const emit = defineEmits(["ready", "focus", "update:value", "blur", "keyboard:delete"]);

const CKEditorVue = CKEditor.component;
const { generalConfig, registerDeletionHandler } = useEditorConfig();

const modelValue = useVModel(props, "value", emit);
const ck = ref(null);

const config = computed(() => ({
	...generalConfig,
	toolbar: {
		items: advancedFormattingToolbar,
	},
	plugins: advancedPlugins,
	heading: compactHeadings,
	placeholder: props.placeholder,
	ui: {
		viewportOffset: {
			top: props.viewportOffsetTop,
		},
	},
}));

const handleFocus = () => emit("focus");
const handleBlur = () => emit("blur");
const handleDelete = () => emit("keyboard:delete");

const handleReady = (editor: Editor) => {
	emit("ready");

	if (props.autofocus) {
		editor.editing.view.focus();
	}

	registerDeletionHandler(editor, handleDelete);
};
</script>

<style lang="css">
/* we can't import css in scss anymore, so it is moved to this css style block */
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";
@import "katex/dist/katex.min.css";
</style>

<style lang="scss">
@use "sass:map";
@use "@/styles/settings.scss" as *;

:root {
	// todo: we need to figure out, what this comment was for:
	// z-index must be less than z-index of the headers to prevent that the toolbar is shown in front of the headers when scrolling.

	// actually it was useless until now as the name of the css variable changed in release 41
	// https://ckeditor.com/docs/ckeditor5/latest/updating/guides/update-to-41.html#minor-breaking-changes-in-this-release-4
	// so maybe the ck was buggy somewhere or we can simply ignore the value "15" before and get high here
	// to always be on top of any vuetify components, e.g. dialogs/overlays/modals
	--ck-z-panel: 10100;
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

@media #{map.get($display-breakpoints, "sm-and-up")} {
	.ck.ck-toolbar_floating {
		min-width: 460px;
	}
}

.ck-math-tex {
	font-size: large;
}
</style>
