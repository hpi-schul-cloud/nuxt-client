<template>
	<div>
		ar
		<template>
			<audio
				controls
				ref="audioRef"
				class="audio"
				loading="lazy"
				:src="src"
				v-on:error="onError"
			/>
		</template>

		<template class="menu"><slot></slot></template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";

export default defineComponent({
	name: "AudioDisplay",
	props: {
		src: { type: String, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};
		return { onError };
	},
});
</script>
<style scoped>
.audio {
	width: 85%;
	padding: 10px;
}
.menu {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
