<template>
	<ContentElementBar v-if="isEditMode">
		<div
			v-if="isUploading"
			class="d-flex align-center pt-1"
			style="height: 32px"
		>
			<v-progress-linear
				data-testid="board-file-element-progress-bar"
				indeterminate
				color="primary"
			/>
		</div>
		<template #element>
			<AudioRecorder :show-menu="false" @upload:file="onUpload" />
		</template>

		<template #menu>
			<slot />
		</template>
	</ContentElementBar>
</template>

<script lang="ts">
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";
import AudioRecorder from "./recorder/AudioRecorder.vue";
export default defineComponent({
	name: "AudioRecordFileUpload",
	components: { ContentElementBar, AudioRecorder },
	props: {
		isEditMode: { type: Boolean },
		isUploading: { type: Boolean },
	},
	emits: ["upload:file"],
	setup(props, { emit }) {
		const onUpload = async (file: File) => {
			emit("upload:file", file);
		};

		return {
			onUpload,
		};
	},
});
</script>
