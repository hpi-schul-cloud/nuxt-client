<template>
	<div>
		<default-wireframe headline="POC - Editor CKEditor 5" :full-width="false">
			<ckeditor
				v-model="htmlInput1"
				:editor="editor1"
				:config="editorConfig1"
				@input="onEditorInput1"
			></ckeditor>
			<br />
			<ckeditor
				v-model="htmlInput2"
				:editor="editor2"
				:config="editorConfig2"
				@input="onEditorInput2"
			></ckeditor>
		</default-wireframe>
	</div>
</template>
<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";

// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/vuejs-v2.html#using-the-component-locally

export default {
	components: {
		DefaultWireframe,
		ckeditor: CKEditor.component,
	},
	layout: "defaultVuetify",
	data() {
		return {
			editor1: ClassicEditor,
			editor2: ClassicEditor,
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
	mounted() {},
	methods: {
		onEditorInput1() {
			console.log(this.htmlInput1);
		},
		onEditorInput2() {
			console.log(this.htmlInput2);
		},
	},
};
</script>
