<template>
	<div>
		<default-wireframe headline="POC - Editor CKEditor 5" :full-width="false">
			<ckeditor
				v-model="editorData"
				:editor="editor"
				:config="editorConfig"
			></ckeditor>
		</default-wireframe>
	</div>
</template>
<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
			editorData: "<p>Content of the editor.</p>",
			editorConfig: {
				// The configuration of the editor.
			},
		};
	},
	mounted() {},
	methods: {},
};
</script>
