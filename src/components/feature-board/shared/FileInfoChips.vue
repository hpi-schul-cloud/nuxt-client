<template>
	<div>
		<v-chip class="ma-2" small>{{ fileExtension }}</v-chip>
		<v-chip class="ma-2" small> {{ fileSize }} </v-chip>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import {
	convertFileSizeToHumanReadable,
	getFileExtension,
} from "@/utils/fileHelper";

export default defineComponent({
	name: "FileInfoChips",
	props: {
		fileRecord: {
			type: Object as PropType<FileRecordResponse>,
			required: true,
		},
	},

	setup(props) {
		const fileSize = computed(() =>
			convertFileSizeToHumanReadable(props.fileRecord.size)
		);

		const fileExtension = computed(() =>
			getFileExtension(props.fileRecord.name)
		);

		return {
			fileSize,
			fileExtension,
		};
	},
});
</script>
