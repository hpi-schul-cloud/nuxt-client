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
		autofocus: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const ck = ref(null);
		const content = ref(props.value);
		const language = i18n.locale;
		const charCount = ref(0);

		const toolbarItems = {
			simple: [
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
			],
			regular: [
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
			],
		};

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
			link: {
				defaultProtocol: "//",
			},
			highlight: {
				options: [
					{
						model: "dullPinkMarker",
						class: "marker-dull-pink",
						title: i18n.t("components.edtitor.highlight.dullPink").toString(),
						color: "#f2d0db",
						type: "marker",
					},
					{
						model: "pinkMarker",
						class: "marker-pink",
						title: "Pink marker",
						color: "var(--ck-highlight-marker-pink)",
						type: "marker",
					},
					{
						model: "dullYellowMarker",
						class: "marker-dull-yellow",
						title: i18n.t("components.edtitor.highlight.dullYellow").toString(),
						color: "#f3d9c3",
						type: "marker",
					},
					{
						model: "yellowMarker",
						class: "marker-yellow",
						title: "Yellow marker",
						color: "var(--ck-highlight-marker-yellow)",
						type: "marker",
					},
					{
						model: "dullBlueMarker",
						class: "marker-dull-blue",
						title: i18n.t("components.edtitor.highlight.dullBlue").toString(),
						color: "#c3e0f2",
						type: "marker",
					},
					{
						model: "blueMarker",
						class: "marker-blue",
						title: "Blue marker",
						color: "var(--ck-highlight-marker-blue)",
						type: "marker",
					},
					{
						model: "dullGreenMarker",
						class: "marker-dull-green",
						title: i18n.t("components.edtitor.highlight.dullGreen").toString(),
						color: "#d8e3ce",
						type: "marker",
					},
					{
						model: "greenMarker",
						class: "marker-green",
						title: "Green marker",
						color: "var(--ck-highlight-marker-green)",
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
	.marker-dull-pink {
		background-color: #f2d0db;
	}
	.marker-dull-yellow {
		background-color: #f3d9c3;
	}
	.marker-dull-blue {
		background-color: #c3e0f2;
	}
	.marker-dull-green {
		background-color: #d8e3ce;
	}
}

.ck-blurred {
	border: none !important;
}

.ck-focused {
	border: none !important;
	box-shadow: none !important;
}
</style>
