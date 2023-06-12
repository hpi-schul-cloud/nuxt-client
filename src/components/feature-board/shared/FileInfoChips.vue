<template>
	<v-list-item>
		<v-chip class="ma-2" small> {{ fileRecord.mimeType }} </v-chip>
		<v-chip class="ma-2" small> {{ fileSize }} KB </v-chip>
	</v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
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
		const fileSize = (props.fileRecord.size / 1024).toFixed(2);
		return {
			fileSize,
		};
	},
});
</script>
