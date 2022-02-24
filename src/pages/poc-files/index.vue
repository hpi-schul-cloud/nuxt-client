<template>
	<default-wireframe headline="Files POC" :full-width="false">
		<div class="d-flex">
			<v-file-input
				v-model="file"
				show-size
				small-chips
				label="Datei auswählen"
			></v-file-input>
			<v-btn color="primary" :loading="isLoading" @click="upload">
				Hochladen
			</v-btn>
		</div>
		<v-list>
			<h2 class="h4">Uploaded files</h2>
			<template v-for="f in files">
				<v-list-item :key="f.id" @click="download(f)">
					<v-list-item-title>{{ f.name }}</v-list-item-title>
				</v-list-item>
			</template>
		</v-list>
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
			file: null,
		};
	},
	computed: {
		loadingState: () => FilesPOCModule.getStatus,
		files: () => FilesPOCModule.getFiles,
		isLoading() {
			return this.loadingState === "pending";
		},
	},
	watch: {
		loadingState: function (newValue, oldValue) {
			if (oldValue === "pending" && newValue === "completed") {
				this.file = null;
			}
		},
	},
	methods: {
		upload() {
			const { file } = this;
			if (file) {
				FilesPOCModule.upload(file);
			}
		},
		download(file) {
			console.log(file);
			FilesPOCModule.download(file);
		},
	},
	head() {
		return {
			title: "Files POC",
		};
	},
};
</script>
