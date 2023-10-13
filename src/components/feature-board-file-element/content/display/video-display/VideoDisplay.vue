<template>
	<div>
		<video
			controls
			ref="videoRef"
			class="video"
			loading="lazy"
			:src="src"
			:alt="name"
		/>
		<ContentElementBar class="menu">
			<template #menu><slot></slot></template>
		</ContentElementBar>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ContentElementBar } from "@ui-board";
import { FileAlert } from "../../../shared/types/FileAlert.enum";

export default defineComponent({
	name: "VideoDisplay",
	props: {
		src: { type: String, required: true },
		name: { type: String, required: true },
	},
	components: { ContentElementBar },
	emits: ["error"],
	setup(props, { emit }) {
		const videoRef = ref<HTMLVideoElement | null>(null);

		onMounted(() => {
			videoRef.value?.addEventListener("error", () => {
				emit("error", FileAlert.VIDEO_FORMAT_ERROR);
			});
		});

		return {
			videoRef,
		};
	},
});
</script>
<style scoped>
.video {
	width: 100%;
}

.menu {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
