<template>
	<v-dialog fullscreen v-model="isLightBoxOpen">
		<v-card variant="text">
			<v-toolbar :height="toolbarHeight" flat>
				<v-btn icon @click="close" data-test-id="light-box-close-btn">
					<v-icon>{{ mdiClose }}</v-icon>
				</v-btn>

				<v-icon color="black" size="20" class="mr-1">{{
					mdiFileDocumentOutline
				}}</v-icon>

				<v-toolbar-title v-if="lightBoxOptions.name !== ''">
					{{ lightBoxOptions.name }}
				</v-toolbar-title>
				<v-spacer />
				<v-btn
					v-if="lightBoxOptions.downloadUrl !== ''"
					icon
					@click="download"
					data-test-id="light-box-download-btn"
				>
					<v-icon>{{ mdiTrayArrowDown }}</v-icon>
				</v-btn>
			</v-toolbar>
			<v-row class="align-center justify-center ma-0" @click="close">
				<v-col class="d-flex align-items-center justify-content-center pa-0">
					<PreviewImage
						:src="lightBoxOptions.previewUrl"
						:alt="lightBoxOptions.alt"
						:max-height="displayHeight"
					/>
				</v-col>
			</v-row>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { onKeyStroke, useWindowSize } from "@vueuse/core";
import { defineComponent, ref, watch } from "vue";
import { useInternalLightBox } from "./LightBox.composable";
import { PreviewImage } from "@ui-preview-image";

export default defineComponent({
	name: "LightBox",
	components: {
		PreviewImage,
	},
	setup() {
		const { close, isLightBoxOpen, lightBoxOptions } = useInternalLightBox();
		const isImageLoading = ref(true);
		const { height } = useWindowSize();
		const displayHeight = ref(0);
		const toolbarHeight = 64;

		onKeyStroke("Escape", () => close(), { eventName: "keydown" });

		const download = async () => {
			await downloadFile(
				lightBoxOptions.value.downloadUrl,
				lightBoxOptions.value.name
			);
		};

		watch(isLightBoxOpen, () => {
			isImageLoading.value = true;
		});

		watch(
			height,
			() => {
				const imagePadding = 25;
				displayHeight.value = height.value - toolbarHeight - imagePadding;
			},
			{ immediate: true }
		);

		return {
			close,
			download,
			isLightBoxOpen,
			lightBoxOptions,
			mdiClose,
			mdiFileDocumentOutline,
			mdiTrayArrowDown,
			isImageLoading,
			displayHeight,
			toolbarHeight,
		};
	},
});
</script>
