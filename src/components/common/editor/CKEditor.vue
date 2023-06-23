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
		@ready="handleReady"
		@input="handleInput"
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
	emits: ["ready", "focus", "input", "blur"],
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
		focus: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const ck = ref(null);

		const content = ref(props.value);
		const language = i18n.locale;

		const toolbarItems = [];
		toolbarItems["simple"] = [
			"heading",
			"|",
			"bold",
			"italic",
			"fontBackgroundColor",
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
			"Font",
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
						model: "yellowMarker",
						class: "marker-yellow",
						title: "Yellow Marker",
						color: "var(--ck-highlight-marker-yellow)",
						type: "marker",
					},
					{
						model: "greenMarker",
						class: "marker-green",
						title: "Green marker",
						color: "var(--ck-highlight-marker-green)",
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
						model: "blueMarker",
						class: "marker-blue",
						title: "Blue marker",
						color: "var(--ck-highlight-marker-blue)",
						type: "marker",
					},
				],
			},
			fontBackgroundColor: {
				colors: [
					{
						color: "#D4D6D9",
					},
					{
						color: "#DBD4D1",
					},
					{
						color: "#F3D9C3",
					},
					{
						color: "#DDDBC8",
					},
					{
						color: "#D8E3CE",
					},
					{
						color: "#C3E1DE",
					},
					{
						color: "#C3E0F2",
					},
					{
						color: "#CDD3F6",
					},
					{
						color: "#E2CBE6",
					},
					{
						color: "#EEC3F5",
					},
					{
						color: "#F2D0DB",
					},
					{
						color: "#EEC3C3",
					},
				],
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

		const handleReady = (editor) => {
			emit("ready");

			if (props.focus) {
				editor.editing.view.focus();
			}
		};

		return {
			ck,
			content,
			CustomCKEditor,
			config,
			handleBlur,
			handleFocus,
			handleInput,
			handleReady,
		};
	},
});
</script>

<style lang="scss">
@import "katex/dist/katex.min.css";

// TODO move all style to ckbuild
.ck-blurred {
	border: none !important;
}

.ck-focused {
	border: none !important;
	box-shadow: none !important;
}
</style>
