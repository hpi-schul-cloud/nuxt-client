<template>
	<div>
		<video
			ref="videoRef"
			controls
			controlsList="nodownload"
			class="video"
			loading="lazy"
			data-testid="video-thumbnail-in-card"
			:src="src"
			:aria-label="name"
			@error="onError"
		/>
		<ContentElementBar class="menu">
			<template v-if="showMenu" #menu><slot /></template>
		</ContentElementBar>
	</div>
</template>

<script lang="ts">
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";
import { AudioRecordAlert } from "../../alert/AudioRecordAlert.enum";

export default defineComponent({
	name: "AudioVideoPlayer",
	components: { ContentElementBar },
	props: {
		src: { type: String, required: true },
		name: { type: String, required: true },
		showMenu: { type: Boolean, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const onError = () => {
			emit("error", AudioRecordAlert.VIDEO_FORMAT_ERROR);
		};

		return {
			onError,
		};
	},
});
</script>
<style lang="scss" scoped>
.video {
	width: 100%;
	display: block;
	outline: none;

	&:focus {
		outline: auto;
	}
}

.menu {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
