<template>
	<v-list-item>
		<v-chip class="ma-2" small>{{ fileExtension }}</v-chip>
		<v-chip class="ma-2" small> {{ fileSize }} </v-chip>
	</v-list-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
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
		const fileRecordSize = ref(props.fileRecord.size);

		const fileSize = computed(() => {
			const units = ["B", "KB", "MB", "GB", "TB"];
			const threshold = 1024;

			let convertedSize = fileRecordSize.value;
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

		const fileName = ref(props.fileRecord.name);

		const fileExtension = computed(() => {
			return fileName.value
				.substring(fileName.value.lastIndexOf(".") + 1)
				.toUpperCase();
		});

		return {
			fileSize,
			fileExtension,
		};
	},
});
</script>
