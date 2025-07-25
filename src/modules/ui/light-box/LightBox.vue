<template>
	<v-dialog v-model="isLightBoxOpen" fullscreen data-testid="light-box">
		<v-toolbar>
			<v-btn
				:aria-label="t('common.labels.close')"
				:icon="mdiClose"
				data-testid="light-box-close-btn"
				@click="close"
			/>

			<v-toolbar-title v-if="lightBoxOptions">
				{{ lightBoxOptions.name }}
			</v-toolbar-title>
			<v-spacer />
			<v-btn
				:aria-label="t('components.board.action.download')"
				:icon="mdiTrayArrowDown"
				data-testid="light-box-download-btn"
				@click="download"
			/>
		</v-toolbar>
		<v-row class="ma-0" style="overflow: auto" @click="close">
			<v-col
				class="d-flex align-items-center justify-center"
				style="height: 100%"
			>
				<PreviewImage
					v-if="
						isLightBoxImageType() &&
						lightBoxOptions &&
						lightBoxOptions.previewUrl &&
						lightBoxOptions.alt
					"
					:src="lightBoxOptions.previewUrl"
					:alt="lightBoxOptions.alt"
				/>
				<AudioPlayer
					v-else-if="
						isLightBoxAudioType() &&
						lightBoxOptions &&
						!hasAudioError &&
						isLightBoxOpen
					"
					:src="lightBoxOptions?.downloadUrl"
					class="audio-player bg-grey-darken-3"
					@click.stop
					@error="handleAudioError"
				/>
				<video
					v-if="
						isLightBoxVideoType() &&
						lightBoxOptions &&
						!hasVideoError &&
						isLightBoxOpen
					"
					controls
					controlsList="nodownload"
					class="video"
					loading="lazy"
					data-testid="video-player"
					:src="lightBoxOptions?.downloadUrl"
					:aria-label="lightBoxOptions?.alt"
					@error="handleVideoError"
					@click.stop
				/>
				<ErrorAlert v-if="hasAudioError" class="error-alert">
					{{ t("components.cardElement.fileElement.audioFormatError") }}
				</ErrorAlert>
				<ErrorAlert v-if="hasVideoError" class="error-alert">
					{{ t("components.cardElement.fileElement.videoFormatError") }}
				</ErrorAlert>
			</v-col>
		</v-row>
	</v-dialog>
</template>

<script setup lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiTrayArrowDown } from "@icons/material";
import { ErrorAlert } from "@ui-alert";
import { AudioPlayer } from "@ui-audio-player";
import { PreviewImage } from "@ui-preview-image";
import { onKeyStroke } from "@vueuse/core";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { LightBoxContentType, useLightBox } from "./LightBox.composable";

const { t } = useI18n();

const { close, isLightBoxOpen, lightBoxOptions } = useLightBox();
const isImageLoading = ref(true);
const hasAudioError = ref(false);
const hasVideoError = ref(false);

onKeyStroke("Escape", () => close(), { eventName: "keydown" });

const handleAudioError = () => {
	hasAudioError.value = true;
};

const handleVideoError = () => {
	hasVideoError.value = true;
};

const download = () => {
	if (!lightBoxOptions.value) return;

	downloadFile(lightBoxOptions.value.downloadUrl, lightBoxOptions.value.name);
};

watch(isLightBoxOpen, () => {
	isImageLoading.value = true;
	hasAudioError.value = false;
	hasVideoError.value = false;
});

const isLightBoxImageType = () => {
	return lightBoxOptions.value?.type === LightBoxContentType.IMAGE;
};
const isLightBoxAudioType = () => {
	return lightBoxOptions.value?.type === LightBoxContentType.AUDIO;
};
const isLightBoxVideoType = () => {
	return lightBoxOptions.value?.type === LightBoxContentType.VIDEO;
};
</script>

<style scoped>
.audio-player {
	width: 90%;
	max-width: 700px;
	height: 64px;
}

.error-alert {
	background-color: white;
	max-width: 663px;
}

.video {
	max-width: 100%;
	max-height: 100%;
}
</style>
