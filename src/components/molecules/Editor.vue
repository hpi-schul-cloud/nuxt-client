<template>
	<div>
		<label class="v-label theme--light">{{ label }}</label>

		<div class="ck-wrapper">
			<ckeditor
				v-model="content"
				:config="config"
				:editor="CustomCKEditor"
				@input="handleInput"
			></ckeditor>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
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
		language: {
			type: String,
			validator: (value) => ["de", "en", "es"].includes(value),
			default: "de",
		},
	},
	setup(props, { emit }) {
		const content = ref(props.value);

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
			language: props.language,
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

<style scoped>
.ck-wrapper {
	margin: var(--space-xs) 0 var(--space-md) 0;
}
</style>
