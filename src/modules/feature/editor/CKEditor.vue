<template>
	<ckeditor
		ref="ck"
		v-model="modelValue"
		:editor="editor"
		:config="config"
		data-testid="ckeditor"
		:disabled="disabled"
		@blur="handleBlur"
		@focus="handleFocus"
		@ready="handleReady"
	/>
</template>

<script>
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { BalloonEditor, ClassicEditor } from "@hpi-schul-cloud/ckeditor";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import { useMediaQuery, useVModel } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useEditorConfig } from "./EditorConfig.composable";
import katex from "katex";
window.katex = katex;

export default defineComponent({
	name: "CkEditor",
	components: {
		ckeditor: CKEditor.component,
	},
	emits: [
		"ready",
		"focus",
		"update:value",
		"blur",
		"keyboard",
		"keyboard:delete",
	],
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: [String, undefined],
			default: "",
		},
		type: {
			type: String,
			validator: (value) => ["classic", "balloon"].includes(value),
			default: "classic",
		},
		mode: {
			type: String,
			validator: (value) => ["simple", "regular", "news"].includes(value),
			default: "regular",
		},
		disabled: {
			type: Boolean,
		},
		autofocus: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const {
			boardPlugins,
			newsPlugins,
			inlineEditorToolbarItems,
			balloonEditorToolbarItems,
			classicEditorToolbarItems,
			compactHeadings,
			prominentHeadings,
			generalConfig,
		} = useEditorConfig();

		const ck = ref(null);
		const modelValue = useVModel(props, "value", emit);
		const editor = computed(() => {
			return props.type === "classic" ? ClassicEditor : BalloonEditor;
		});

		const charCount = ref(0);

		const toolbarItems = {
			simple: balloonEditorToolbarItems,
			regular: inlineEditorToolbarItems,
			news: classicEditorToolbarItems,
		};

		const plugins = {
			simple: boardPlugins,
			regular: boardPlugins,
			news: newsPlugins,
		};

		const headings = {
			simple: compactHeadings,
			regular: compactHeadings,
			news: prominentHeadings,
		};

		const config = computed(() => {
			return {
				...generalConfig,
				toolbar: {
					items: toolbarItems[props.mode],
					shouldNotGroupWhenFull: showFullToolbar.value,
				},
				plugins: plugins[props.mode],
				heading: headings[props.mode],
				placeholder: props.placeholder,
			};
		});

		const handleFocus = () => emit("focus");
		const handleBlur = () => emit("blur");
		const handleDelete = () => {
			if (charCount.value === 0) {
				emit("keyboard:delete");
			}
		};

		const handleReady = (editor) => {
			emit("ready");

			if (props.autofocus) {
				editor.editing.view.focus();
			}

			// attach additional event listener not provided by vue wrapper itself
			// for more infos on editor instance, see https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
			editor.editing.view.document.on("keydown", (evt, data) => {
				if (
					data.domEvent.key === "Backspace" ||
					data.domEvent.key === "Delete"
				) {
					handleDelete();
				}
			});
		};

		const isMobile = useMediaQuery(DeviceMediaQuery.Mobile);
		const showFullToolbar = computed(() => {
			return props.mode === "simple" && !isMobile.value;
		});

		return {
			ck,
			editor,
			modelValue,
			config,
			charCount,
			handleBlur,
			handleFocus,
			handleDelete,
			handleReady,
		};
	},
});
</script>

<style lang="scss">
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";
@import "katex/dist/katex.min.css";

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
