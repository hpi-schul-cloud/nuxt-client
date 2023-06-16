<template>
	<v-chip-group>
		<v-chip class="ma-2" small disabled>{{ fileExtension }}</v-chip>
		<v-chip class="ma-2" small disabled> {{ humanReadableFileSize }} </v-chip>
	</v-chip-group>
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
			convertFileSizeToHumanReadable(props.fileSize, 2)
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

<style lang="scss" scoped>
.v-chip {
	opacity: 1;
}
</style>
