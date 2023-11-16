<template>
	<ContentElementBar class="audioplayer">
		<template #element>
			<audio
				ref="audio"
				class="audio"
				loading="lazy"
				v-on:error="onError"
				controlsList="nodownload noplaybackrate"
			/>
			<button @click="playing = !playing">
				<v-icon
					role="img"
					aria-hidden="false"
					style="color: white"
					v-if="!playing"
					>{{ mdiPlay }}</v-icon
				>
				<v-icon role="img" aria-hidden="false" style="color: white" v-else>
					{{ mdiPause }}</v-icon
				>
			</button>
			<span style="color: white" class="duration text-body-2">
				{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</span
			>
			<v-slider
				class="slider"
				color="white"
				thumb-color="white"
				track-color="#9e9e9e"
				v-model="currentTime"
				:max="max"
				:min="min"
			/>
			<SpeedMenu />
			<button @click="muted = !muted">
				<v-icon
					role="img"
					aria-hidden="false"
					style="color: white"
					v-if="muted"
					>{{ mdiVolumeOff }}</v-icon
				>
				<v-icon
					role="img"
					aria-hidden="false"
					style="color: white; padding: 10px"
					v-else
					>{{ mdiVolumeHigh }}</v-icon
				>
			</button>
		</template>
		<template #menu><slot /></template>
	</ContentElementBar>
</template>

<script lang="ts">
import {
	mdiPause,
	mdiPlay,
	mdiPlaySpeed,
	mdiVolumeHigh,
	mdiVolumeOff,
} from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { useMediaControls } from "@vueuse/core";
import { computed, defineComponent, onMounted, ref } from "vue";
import { FileAlert } from "../../../shared/types/FileAlert.enum";
import SpeedMenu from "./SpeedMenu.vue";

export default defineComponent({
	name: "AudioDisplay",
	components: { ContentElementBar, SpeedMenu },
	props: {
		src: { type: String, required: true },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const audio = ref();
		const isOpen = ref(true);
		const source = computed(() => {
			return props.src;
		});

		const controls = useMediaControls(audio, {
			src: source,
		});

		const { playing, currentTime, duration, volume, muted, rate } = controls;

		const onError = () => {
			emit("error", FileAlert.AUDIO_FORMAT_ERROR);
		};

		const formatDuration = (seconds: number) => {
			return new Date(1000 * seconds).toISOString().slice(14, 19);
		};

		const max = computed(() => {
			return Math.floor(duration.value);
		});

		const min = computed(() => {
			return 0;
		});

		const open = () => {
			return (isOpen.value = true);
		};

		const close = () => {
			return (isOpen.value = false);
		};

		onMounted(() => {
			volume.value = 0.5;
			currentTime.value = 60;
		});

		return {
			audio,
			playing,
			currentTime,
			duration,
			volume,
			muted,
			rate,
			mdiPlay,
			mdiPause,
			mdiVolumeOff,
			mdiVolumeHigh,
			mdiPlaySpeed,
			onError,
			formatDuration,
			open,
			close,
			max,
			min,
		};
	},
});
</script>
<style scoped>
button:focus {
	outline: none;
}

.audioplayer {
	background-color: #424242;
	margin-top: 0px;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
}
.audio {
	width: 100%;
}
.duration {
	width: 100%;
}
.slider {
	width: 100%;
	padding-top: 20px;
}
</style>
