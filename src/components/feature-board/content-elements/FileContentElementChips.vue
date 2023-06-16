<template>
	<v-chip-group>
		<v-chip class="ma-2" small disabled>{{ fileExtension }}</v-chip>
		<v-chip class="ma-2" small disabled> {{ fileSize }} </v-chip>
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
		fileRecordSize: {
			type: Number,
			required: true,
		},
		fileRecordName: {
			type: String,
			required: true,
		},
	},

	setup(props) {
		const fileSize = computed(() =>
			convertFileSizeToHumanReadable(props.fileRecordSize)
		);

		const fileExtension = computed(() =>
			getFileExtension(props.fileRecordName)
		);

		return {
			fileSize,
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
