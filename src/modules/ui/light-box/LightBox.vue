<template>
	<v-dialog v-model="isLightBoxOpen" fullscreen data-testid="light-box">
		<v-toolbar>
			<v-btn
				:aria-label="t('common.labels.close')"
				:icon="mdiClose"
				data-testid="light-box-close-btn"
				@click="close"
			/>

			<v-toolbar-title v-if="lightBoxOptions?.name">
				{{ lightBoxOptions.name }}
			</v-toolbar-title>
			<v-spacer />
			<v-btn
				v-if="lightBoxOptions?.downloadUrl"
				:aria-label="t('components.board.action.download')"
				:icon="mdiTrayArrowDown"
				data-testid="light-box-download-btn"
				@click="download"
			/>
		</v-toolbar>
		<v-row class="ma-0" style="overflow: auto" @click="close">
			<v-col class="d-flex align-items-center" style="height: 100%">
				<PreviewImage
					v-if="lightBoxOptions?.type === LightBoxContentType.IMAGE"
					:src="lightBoxOptions.previewUrl!"
					:alt="lightBoxOptions.alt!"
				/>
				<AudioPlayer
					v-else-if="lightBoxOptions?.type === LightBoxContentType.AUDIO"
					:src="lightBoxOptions?.downloadUrl"
					class="audio-player bg-grey-darken-3"
					@click.stop
				/>
			</v-col>
		</v-row>
	</v-dialog>
</template>

<script setup lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiTrayArrowDown } from "@icons/material";
import { onKeyStroke } from "@vueuse/core";
import { ref, watch } from "vue";
import { LightBoxContentType, useLightBox } from "./LightBox.composable";
import { PreviewImage } from "@ui-preview-image";
import { useI18n } from "vue-i18n";
import { AudioPlayer } from "@ui-audio-player";

const { t } = useI18n();

const { close, isLightBoxOpen, lightBoxOptions } = useLightBox();
const isImageLoading = ref(true);

onKeyStroke("Escape", () => close(), { eventName: "keydown" });

const download = async () => {
	await downloadFile(
		lightBoxOptions.value!.downloadUrl,
		lightBoxOptions.value!.name
	);
};

watch(isLightBoxOpen, () => {
	isImageLoading.value = true;
});
</script>

<style scoped>
.audio-player {
	width: 320px;
	height: 64px;
	margin: 0 auto;
}
</style>
