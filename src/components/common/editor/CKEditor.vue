<template>
	<ckeditor
		ref="ck"
		v-model="content"
		:config="config"
		:editor="CustomCKEditor"
		data-testid="ckeditor"
		:disabled="disabled"
		@blur="handleBlur"
		@focus="handleFocus"
		@input="handleInput"
		@ready="handleReady"
	/>
</template>

<script>
import { I18N_KEY, injectStrict } from "@/utils/inject";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import { defineComponent, ref, watch } from "vue";
window.katex = require("katex");

export default defineComponent({
	name: "CkEditor",
	components: {
		ckeditor: CKEditor.component,
	},
	emits: ["ready", "focus", "input", "blur", "keyboard:delete"],
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		mode: {
			type: String,
			validator: (value) => ["simple", "regular"].includes(value),
			default: "regular",
		},
		disabled: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const ck = ref(null);
		const content = ref(props.value);
		const language = i18n.locale;
		const charCount = ref(0);

		const toolbarItems = [];
		toolbarItems["simple"] = [
			"heading",
			"|",
			"bold",
			"italic",
			"highlight",
			"|",
			"link",
			"bulletedList",
			"numberedList",
			"removeFormat",
		];
		toolbarItems["regular"] = [
			"undo",
			"redo",
			"|",
			"heading",
			"|",
			"bold",
			"italic",
			"underline",
			"strikethrough",
			"highlight",
			"fontBackgroundColor",
			"code",
			"superscript",
			"subscript",
			"|",
			"link",
			"bulletedList",
			"numberedList",
			"math",
			"horizontalLine",
			"|",
			"blockQuote",
			"insertTable",
			"specialCharacters",
			"removeFormat",
		];

		const plugins = [
			"Autoformat",
			"Essentials",
			"BlockQuote",
			"Bold",
			"Code",
			"Heading",
			"Highlight",
			"HorizontalLine",
			"Italic",
			"Link",
			"List",
			"Math",
			"Paragraph",
			"RemoveFormat",
			"SpecialCharacters",
			"Strikethrough",
			"Subscript",
			"Superscript",
			"Table",
			"TableToolbar",
			"Underline",
			"WordCount",
		];

		watch(
			() => props.value,
			(newValue) => {
				content.value = newValue;
			}
		);

		const config = {
			toolbar: {
				items: toolbarItems[props.mode],
			},
			plugins: plugins,
			heading: {
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
			},
			highlight: {
				options: [
					{
						model: "marker1",
						class: "marker-1",
						title: "Marker 1",
						color: "#d4d6d9",
						type: "marker",
					},
					{
						model: "marker2",
						class: "marker-2",
						title: "Marker 2",
						color: "#dbd4d1",
						type: "marker",
					},
					{
						model: "marker3",
						class: "marker-3",
						title: "Marker 3",
						color: "#f3d9c3",
						type: "marker",
					},
					{
						model: "marker4",
						class: "marker-4",
						title: "Marker 4",
						color: "#dddbc8",
						type: "marker",
					},
					{
						model: "marker5",
						class: "marker-5",
						title: "Marker 5",
						color: "#d8e3ce",
						type: "marker",
					},
					{
						model: "marker6",
						class: "marker-6",
						title: "Marker 6",
						color: "#c3e1de",
						type: "marker",
					},
					{
						model: "marker7",
						class: "marker-7",
						title: "Marker 7",
						color: "#c3e0f2",
						type: "marker",
					},
					{
						model: "marker8",
						class: "marker-8",
						title: "Marker 8",
						color: "#cdd3f6",
						type: "marker",
					},
					{
						model: "marker9",
						class: "marker-9",
						title: "Marker 9",
						color: "#e2cbe6",
						type: "marker",
					},
					{
						model: "marker10",
						class: "marker-10",
						title: "Marker 10",
						color: "#eec3f5",
						type: "marker",
					},
					{
						model: "marker11",
						class: "marker-11",
						title: "Marker 11",
						color: "#f2d0db",
						type: "marker",
					},
					{
						model: "marker12",
						class: "marker-13",
						title: "Marker 12",
						color: "#eec3c3",
						type: "marker",
					},
				],
			},
			wordCount: {
				onUpdate: (stats) => {
					charCount.value = stats.characters;
				},
			},
			language: language,
			placeholder: props.placeholder,
		};

		const handleInput = () => emit("input", content.value);
		const handleFocus = () => emit("focus");

		const blurDelay = 200;
		const handleBlur = () => {
			setTimeout(() => emit("blur"), blurDelay);
		};

		const handleDelete = () => {
			if (charCount.value === 0) {
				emit("keyboard:delete");
			}
		};

		const handleReady = (editor) => {
			emit("ready");

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

		return {
			ck,
			content,
			CustomCKEditor,
			config,
			charCount,
			handleBlur,
			handleFocus,
			handleInput,
			handleDelete,
			handleReady,
		};
	},
});
</script>

<style lang="scss">
@import "katex/dist/katex.min.css";
@import "@hpi-schul-cloud/ckeditor/build/ckeditor.css";

.ck-content {
	.marker-1 {
		background-color: #d4d6d9;
	}
	.marker-2 {
		background-color: #dbd4d1;
	}
	.marker-3 {
		background-color: #f3d9c3;
	}
	.marker-4 {
		background-color: #dddbc8;
	}
	.marker-5 {
		background-color: #d8e3ce;
	}
	.marker-6 {
		background-color: #c3e1de;
	}
	.marker-7 {
		background-color: #c3e0f2;
	}
	.marker-8 {
		background-color: #cdd3f6;
	}
	.marker-9 {
		background-color: #e2cbe6;
	}
	.marker-10 {
		background-color: #eec3f5;
	}
	.marker-11 {
		background-color: #f2d0db;
	}
	.marker-12 {
		background-color: #eec3c3;
	}
}
// TODO move all style to ckbuild
.ck-blurred {
	border: none !important;
}

.ck-focused {
	border: none !important;
	box-shadow: none !important;
}
</style>
