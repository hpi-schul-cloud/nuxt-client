<template>
	<v-list-item>
		<v-chip class="ma-2" small>{{ fileExtension }}</v-chip>
		<v-chip class="ma-2" small> {{ fileSize }} </v-chip>
	</v-list-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";

export default defineComponent({
	name: "FileInfoChips",
	props: {
		fileRecord: {
			type: Object as PropType<FileRecordResponse>,
			required: true,
		},
	},

	setup(props) {
		const fileSize = computed(() => {
			const units = ["B", "KB", "MB", "GB", "TB"];
			const threshold = 1024;

			let convertedSize = props.fileRecord.size;
			let unit = units[0];
			let power = 1;

			while (convertedSize >= threshold && units.length >= power) {
				convertedSize /= threshold;
				unit = units[power];
				power++;
			}

			const humanReadableFileSize = convertedSize.toFixed(2) + " " + unit;

			return humanReadableFileSize;
		});

		const fileExtension = computed(() => {
			const ext = props.fileRecord.name
				.substring(props.fileRecord.name.lastIndexOf(".") + 1)
				.toUpperCase();

			return ext;
		});

		return {
			fileSize,
			fileExtension,
		};
	},
});
</script>
