<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12">
				<ckeditor
					v-model="editorData"
					:editor="editor"
					:config="editorConfig"
					@input="onEditorInput"
				></ckeditor>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { defineComponent } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Editor from "ckeditor5-custom-build";
import "ckeditor5-custom-build/build/translations/en";
import "ckeditor5-custom-build/build/translations/es";

export default defineComponent({
	name: "CK5ProofOfConcept",
	components: {
		ckeditor: CKEditor.component,
	},
	data() {
		return {
			editor: Editor,
			editorData: `<h2>Some headliner</h2>
			<iframe src="https://www.google.com" title="I am dangourous">I will no longer be an iframe</iframe>
			<p><math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>9</mn></msqrt></math></p>`,
			editorConfig: {
				language: "de",
				//language: "en",
				//language: "es",
			},
		};
	},
	methods: {
		onEditorInput() {
			console.log(this.editorData);
		},
	},
});
</script>
