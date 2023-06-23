<template>
	<div class="pa-2">
		<v-chip class="mr-2" small>{{ fileExtension }}</v-chip>
		<v-chip class="mr-2" small>{{ humanReadableFileSize }}</v-chip>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
	convertFileSizeToHumanReadable,
	getFileExtension,
} from "@/utils/fileHelper";

export default defineComponent({
	name: "FileContentElementChips",
	props: {
		fileSize: {
			type: Number,
			required: true,
		},
		fileName: {
			type: String,
			required: true,
		},
	},

	setup(props) {
		const humanReadableFileSize = computed(() =>
			convertFileSizeToHumanReadable(props.fileSize)
		);

		const fileExtension = computed(() =>
			getFileExtension(props.fileName).toUpperCase()
		);

		return {
			humanReadableFileSize,
			fileExtension,
		};
	},
});
</script>
