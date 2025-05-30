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
			<v-col class="d-flex align-items-center" style="height: 100%">
				<PreviewImage
					v-if="
						lightBoxOptions?.type === LightBoxContentType.IMAGE &&
						lightBoxOptions.previewUrl &&
						lightBoxOptions.alt
					"
					:src="lightBoxOptions.previewUrl"
					:alt="lightBoxOptions.alt"
				/>
				<AudioPlayer
					v-else-if="
						lightBoxOptions?.type === LightBoxContentType.AUDIO &&
						!hasAudioError &&
						isLightBoxOpen
					"
					:src="lightBoxOptions?.downloadUrl"
					class="audio-player bg-grey-darken-3"
					@click.stop
					@error="handleAudioError"
				/>
				<ErrorAlert v-if="hasAudioError" class="error-alert">
					{{ t("components.cardElement.fileElement.audioFormatError") }}
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

onKeyStroke("Escape", () => close(), { eventName: "keydown" });

const handleAudioError = () => {
	hasAudioError.value = true;
};

const download = async () => {
	if (!lightBoxOptions.value) return;

	await downloadFile(
		lightBoxOptions.value.downloadUrl,
		lightBoxOptions.value.name
	);
};

watch(isLightBoxOpen, () => {
	isImageLoading.value = true;
	hasAudioError.value = false;
});
</script>

<style scoped>
.audio-player {
	width: 90%;
	max-width: 700px;
	height: 64px;
	margin: 0 auto;
}

.error-alert {
	background-color: white;
	max-width: 663px;
	margin-right: auto;
	margin-left: auto;
}
</style>
