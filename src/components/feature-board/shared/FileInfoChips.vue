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
		const units = ["B", "KB", "MB", "GB"];

		const fileSize = computed(() => {
			if (fileRecordSize.value < 1024)
				return (fileRecordSize.value / 1024).toFixed(2) + units[0];
			if (fileRecordSize.value < 1024 ** 2)
				return (fileRecordSize.value / 1024).toFixed(2) + units[1];
			if (fileRecordSize.value < 1024 ** 3)
				return (fileRecordSize.value / 1024 ** 2).toFixed(2) + units[2];
			return (fileRecordSize.value / 1024 ** 3).toFixed(2) + units[3];
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
