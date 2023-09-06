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
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useMediaQuery } from "@vueuse/core";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";
import "@hpi-schul-cloud/ckeditor/build/translations/en";
import "@hpi-schul-cloud/ckeditor/build/translations/es";
import "@hpi-schul-cloud/ckeditor/build/translations/uk";
import { defineComponent, ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
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
		const { t, locale } = useI18n();

		const ck = ref(null);
		const content = ref(props.value);
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

		const config = computed(() => {
			return {
				toolbar: {
					items: toolbarItems[props.mode],
					shouldNotGroupWhenFull: showFullToolbar.value,
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
							title: t("components.editor.highlight.dullPink"),
							color: "var(--ck-highlight-marker-dull-pink)",
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
							title: t("components.editor.highlight.dullYellow"),
							color: "var(--ck-highlight-marker-dull-yellow)",
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
							title: t("components.editor.highlight.dullBlue").toString(),
							color: "var(--ck-highlight-marker-dull-blue)",
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
							title: t("components.editor.highlight.dullGreen").toString(),
							color: "var(--ck-highlight-marker-dull-green)",
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
				language: locale,
				placeholder: props.placeholder,
			};
		});

		const handleInput = () => emit("input", content.value);
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

:root {
	--ck-highlight-marker-dull-blue: hsl(203, 64%, 86%);
	--ck-highlight-marker-dull-green: hsl(91, 27%, 85%);
	--ck-highlight-marker-dull-pink: hsl(341, 57%, 88%);
	--ck-highlight-marker-dull-yellow: hsl(28, 67%, 86%);
}

.ck-content {
	.marker-dull-pink {
		background-color: var(--ck-highlight-marker-dull-pink);
	}
	.marker-dull-yellow {
		background-color: var(--ck-highlight-marker-dull-yellow);
	}
	.marker-dull-blue {
		background-color: var(--ck-highlight-marker-dull-blue);
	}
	.marker-dull-green {
		background-color: var(--ck-highlight-marker-dull-green);
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
