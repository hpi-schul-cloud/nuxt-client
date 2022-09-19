<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12"><h1>Two versions of same editor</h1></v-col>
			<br />
			<v-col cols="4">
				<ckeditor
					v-model="htmlInput1"
					:editor="editor1"
					:config="editorConfig1"
					@input="onEditor1Input"
				></ckeditor>
			</v-col>
			<br />
			<v-col cols="12">
				<ckeditor
					v-model="htmlInput2"
					:editor="editor2"
					:config="editorConfig2"
					@input="onEditor2Input"
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
			editor1: Editor,
			editor2: Editor,
			htmlInput1: `Super simple version`,
			htmlInput2: `Advanced version incl math and other.<br>
			<span class="math-tex">\\( \\sqrt{\\frac{a}{b}} \\)</span>
			<br>`,
			editorConfig1: {
				language: "de",
				//language: "en",
				//language: "es",

				//plugins: ["Paragraph", "Bold", "List", "Math", "HelloWorld", "Image"],
				//toolbar: ["bold", "bulletedList", "math", "helloworld"],
				plugins: ["Essentials", "Paragraph", "Bold", "Underline", "List"],
				toolbar: ["bold", "underline", "bulletedList"],
			},
			editorConfig2: {
				//language: "de",
				language: "en",
				//language: "es",

				//plugins: ["Paragraph", "Bold", "List", "Math", "HelloWorld", "Image"],
				//toolbar: ["bold", "bulletedList", "math", "helloworld"],
			},
		};
	},
	mounted() {
		console.log(Editor.builtinPlugins.map((plugin) => plugin.pluginName));
	},
	methods: {
		onEditor1Input() {
			// configured with html output
			console.log(this.htmlInput1);
		},
		onEditor2Input() {
			// configured with markdown output
			console.log(this.htmlInput2);
		},
	},
});
</script>
