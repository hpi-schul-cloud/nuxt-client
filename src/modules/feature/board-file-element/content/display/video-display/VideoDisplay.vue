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

<script setup lang="ts">
import { FileAlert } from "../../../shared/types/FileAlert.enum";
import { ContentElementBar } from "@ui-board";

type Props = {
	src: string;
	name: string;
	showMenu: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
	(e: "error", fileAlert: FileAlert): void;
}>();

const onError = () => {
	emit("error", FileAlert.VIDEO_FORMAT_ERROR);
};
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
