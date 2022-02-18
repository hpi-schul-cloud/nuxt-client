<template>
	<default-wireframe headline="Files POC" :full-width="false">
		<v-list>
			<v-list-item>
				<v-list-item-title>File 1</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>File 1</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>File 1</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>File 1</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-list-item-title>File 1</v-list-item-title>
			</v-list-item>
		</v-list>
		<div class="d-flex">
			<v-file-input
				v-model="files"
				show-size
				counter
				small-chips
				multiple
				label="Datei auswählen"
			></v-file-input>
			<v-btn color="primary" :loading="loading" @click="upload">
				Hochladen
			</v-btn>
		</div>
	</default-wireframe>
</template>

<script>
import FilesPOCModule from "@/store/files-poc";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";

export default {
	components: {
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	data() {
		return {
			files: null,
		};
	},
	computed: {
		loading: () => {
			return FilesPOCModule.getStatus === "pending";
		},
	},
	methods: {
		upload() {
			const { files } = this;
			console.log("upload", this.files);
			if (files && files.length > 0) {
				FilesPOCModule.upload(files[0]);
			}
		},
	},
	head() {
		return {
			title: "Files POC",
		};
	},
};
</script>
