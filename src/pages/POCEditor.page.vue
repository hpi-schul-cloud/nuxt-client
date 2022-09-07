<template>
	<div>
		<default-wireframe headline="POC - Editor CKEditor 5" :full-width="false">
			<ckeditor
				v-model="editorData"
				:editor="editor"
				:config="editorConfig"
				@input="onEditorInput"
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
			editor: ClassicEditor,
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
	mounted() {},
	methods: {
		onEditorInput() {
			console.log(this.editorData);
		},
	},
};
</script>
