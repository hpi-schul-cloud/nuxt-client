<template>
	<ckeditor
		ref="ck"
		v-model="content"
		:config="config"
		:editor="CustomCKEditor"
		data-testid="ckeditor"
		:disabled="disabled"
		@input="handleInput"
	/>
</template>

<script>
import { defineComponent, ref, inject, watch } from "@vue/composition-api";
import CKEditor from "@ckeditor/ckeditor5-vue2";
require("@hpi-schul-cloud/ckeditor/build/translations/en");
require("@hpi-schul-cloud/ckeditor/build/translations/es");
require("@hpi-schul-cloud/ckeditor/build/translations/uk");
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";

export default defineComponent({
	name: "CkEditor",
	components: {
		ckeditor: CKEditor.component,
	},
	emits: ["input"],
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

		return {
			content,
			CustomCKEditor,
			config,
			handleInput,
		};
	},
});
</script>
