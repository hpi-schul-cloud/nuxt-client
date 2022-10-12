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
						<v-list-item-title>
							<a :href="getDownloadUrl(f)" target="_blank">{{
								f.name
							}}</a> </v-list-item-title
						><v-btn icon @click.prevent="beginEdit(f)"
							><v-icon>{{ mdiPencil }}</v-icon></v-btn
						><v-btn icon @click.prevent="download(f)"
							><v-icon>{{ mdiDownload }}</v-icon></v-btn
						>
					</template>
				</v-list-item>
			</template>
		</v-list>
	</default-wireframe>
</template>

<script>
import { filesPOCModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { mdiPencil, mdiCheck, mdiClose, mdiDownload } from "@mdi/js";
import { $axios } from "../utils/api";

export default {
	components: {
		DefaultWireframe,
	},
	data() {
		return {
			mdiPencil,
			mdiCheck,
			mdiClose,
			mdiDownload,
			file: null,
			editing: {},
		};
	},
	computed: {
		loadingState: () => filesPOCModule.getStatus,
		files: () => filesPOCModule.getFiles,
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
		filesPOCModule.fetchFiles();
	},
	methods: {
		async upload() {
			const { file } = this;
			if (file) {
				filesPOCModule.upload(file);
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
		getDownloadUrl(file) {
			console.dir($axios.defaults);
			const url = `${$axios.defaults.baseURL}/v3/file/download/${file.id}/${file.name}`;
			return url;
		},
	},
	head() {
		return {
			title: "Files POC",
		};
	},
};
</script>
