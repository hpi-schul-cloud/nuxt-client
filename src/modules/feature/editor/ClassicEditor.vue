<template>
	<CKEditorVue
		ref="ck"
		v-model="modelValue"
		:editor="ClassicEditor"
		:config="config"
		data-testid="ckeditor"
		@blur="handleBlur"
		@focus="handleFocus"
		@ready="handleReady"
	/>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { computed, ref } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { Editor } from "@ckeditor/ckeditor5-core";
import { ClassicEditor } from "@hpi-schul-cloud/ckeditor";
import { useEditorConfig } from "./EditorConfig.composable";
import {
	corePlugins,
	mediaFormattingToolbar,
	prominentHeadings,
} from "./config";

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
});

const emit = defineEmits([
	"ready",
	"focus",
	"update:value",
	"blur",
	"keyboard:delete",
]);

const CKEditorVue = CKEditor.component;
const { generalConfig, registerDeletionHandler } = useEditorConfig();

const ck = ref(null);
const modelValue = useVModel(props, "value", emit);

const config = computed(() => {
	return {
		...generalConfig,
		toolbar: {
			items: mediaFormattingToolbar,
		},
		plugins: corePlugins,
		heading: prominentHeadings,
		placeholder: props.placeholder,
	};
});

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

<style lang="scss">
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";

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

.ck.ck-toolbar {
	border: none;
}
</style>
