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
				<v-list-item :key="f.id">
					<template v-if="isEditing(f)"
						><v-text-field
							v-model="editing[f.id]"
							type="string"
							label="Dateiname"
							@keyup.enter.prevent="commitEdit(f)"
						></v-text-field
						><v-btn
							icon
							:loading="isLoading"
							:disabled="isLoading"
							@click.once.prevent="commitEdit(f)"
							><v-icon>{{ mdiCheck }}</v-icon></v-btn
						><v-btn icon @click="endEdit(f)"
							><v-icon>{{ mdiClose }}</v-icon></v-btn
						></template
					>
					<template v-else>
						<v-list-item-title @click="download(f)">{{
							f.name
						}}</v-list-item-title
						><v-btn icon @click.prevent="beginEdit(f)"
							><v-icon>{{ mdiPencil }}</v-icon></v-btn
						>
					</template>
				</v-list-item>
			</template>
		</v-list>
	</default-wireframe>
</template>

<script>
import FilesPOCModule from "@/store/files-poc";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";

import { mdiPencil, mdiCheck, mdiClose } from "@mdi/js";

export default {
	components: {
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	data() {
		return {
			mdiPencil,
			mdiCheck,
			mdiClose,
			file: null,
			editing: {},
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
	mounted() {
		FilesPOCModule.fetchFiles();
	},
	methods: {
		async upload() {
			const { file } = this;
			if (file) {
				await FilesPOCModule.upload(file);
			}
		},
		async download(file) {
			await FilesPOCModule.download(file);
		},
		beginEdit(file) {
			this.editing = Object.assign({}, this.editing, { [file.id]: file.name });
		},
		endEdit(file) {
			this.editing = Object.assign({}, this.editing, { [file.id]: null });
		},
		async commitEdit(file) {
			await FilesPOCModule.rename({
				fileId: file.id,
				fileName: this.editing[file.id],
			});
			this.endEdit(file);
		},
		isEditing(file) {
			return !!this.editing[file.id];
		},
	},
	head() {
		return {
			title: "Files POC",
		};
	},
};
</script>
