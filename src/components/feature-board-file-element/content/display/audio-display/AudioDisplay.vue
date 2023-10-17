<template>
	<div>
		<ContentElementBar class="menu">
			<template #title>
				<audio
					controls
					ref="audioRef"
					class="audio"
					loading="lazy"
					:src="src"
					v-on:error="onError"
				/>
			</template>
			<template #menu><slot></slot></template>
		</ContentElementBar>
	</div>
</template>

<script lang="ts">
import { ContentElementBar } from "@ui-board";
import { defineComponent } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";

export default defineComponent({
	name: "VideoDisplay",
	props: {
		src: { type: String, required: true },
	},
	components: { ContentElementBar },
	emits: ["error"],
	setup(props, { emit }) {
		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};
		return { onError };
	},
});
</script>
