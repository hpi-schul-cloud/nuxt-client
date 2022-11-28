<template>
	<div>
		<label>{{ label }}</label>
		<ckeditor
			ref="ck"
			v-model="content"
			:config="config"
			:editor="CustomCKEditor"
			data-testid="ckeditor"
			@input="handleInput"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
require("@hpi-schul-cloud/ckeditor/build/translations/en");
require("@hpi-schul-cloud/ckeditor/build/translations/es");
import CustomCKEditor from "@hpi-schul-cloud/ckeditor";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "Editor",
	components: {
		ckeditor: CKEditor.component,
	},
	emits: ["input"],
	props: {
		value: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
		mode: {
			type: String,
			validator: (value) => ["simple", "regular"].includes(value),
			default: "regular",
		},
	},
	setup(props, { emit }) {
		const i18n = inject("i18n");

		const content = ref(props.value);
		const language = (() => {
			// as we don't have a translation for ua yet we map to en
			if (i18n.locale === "ua") {
				return "en";
			}

			return i18n.locale;
		})();

		const config = {
			toolbar: {
				items: (() => {
					if (props.mode === "simple") {
						return ["bold", "italic", "underline"];
					}

					return [
						"undo",
						"redo",
						"heading",
						"|",
						"bold",
						"italic",
						"underline",
						"blockQuote",
						"code",
						"superscript",
						"subscript",
						"|",
						"link",
						"bulletedList",
						"numberedList",
					];
				})(),
			},
			plugins: (() => {
				if (props.mode === "simple") {
					return ["Essentials", "Bold", "Italic", "Paragraph", "Underline"];
				}

				return [
					"Essentials",
					"BlockQuote",
					"Bold",
					"Code",
					"Heading",
					"Italic",
					"Link",
					"List",
					"Paragraph",
					"Subscript",
					"Superscript",
					"Underline",
				];
			})(),
			language: language,
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
