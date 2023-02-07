<template>
	<ckeditor
		ref="ck"
		v-model="content"
		:config="config"
		:editor="CustomCKEditor"
		data-testid="ckeditor"
		:disabled="disabled"
		@input="handleInput"
		@focus="handleFocus"
		@blur="handleBlur"
	/>
</template>

<script>
import { defineComponent, ref, inject, watch } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";
window.katex = require("katex");

export default defineComponent({
	name: "CkEditor",
	components: {
		ckeditor: CKEditor.component,
	},
	emits: ["input", "focus", "blur"],
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
		const i18n = inject("i18n");

		const ck = ref(null);
		const content = ref(props.value);
		const language = (() => {
			// map ua to correct uk
			// TODO remove if language code is fixed
			if (i18n.locale === "ua") {
				return "uk";
			}

			return i18n.locale;
		})();

		const toolbarItems = [];
		toolbarItems["simple"] = ["bold", "italic", "underline"];
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

		const plugins = [];
		plugins["simple"] = [
			"Essentials",
			"Bold",
			"Italic",
			"Paragraph",
			"Underline",
		];
		plugins["regular"] = [
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
			plugins: plugins[props.mode],
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
			language: language,
			placeholder: props.placeholder,
		};

		const handleInput = () => emit("input", content.value);
		const handleFocus = () => emit("focus");

		const blurDelay = 200;
		const handleBlur = () => {
			setTimeout(() => emit("blur"), blurDelay);
		};

		return {
			ck,
			content,
			CustomCKEditor,
			config,
			handleInput,
			handleFocus,
			handleBlur,
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

.ck.ck-editor__editable_inline > :last-child {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin-bottom: 34px !important;
}
</style>
