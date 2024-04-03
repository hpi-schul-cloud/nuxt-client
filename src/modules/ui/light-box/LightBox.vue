<template>
	<v-dialog fullscreen v-model="isLightBoxOpen">
		<v-toolbar>
			<v-btn icon @click="close" data-testid="light-box-close-btn">
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
				data-testid="light-box-download-btn"
			>
				<v-icon>{{ mdiTrayArrowDown }}</v-icon>
			</v-btn>
		</v-toolbar>
		<v-row class="ma-0" style="overflow: auto" @click="close">
			<v-col class="d-flex align-items-center" style="height: 100%">
				<PreviewImage
					:src="lightBoxOptions.previewUrl"
					:alt="lightBoxOptions.alt"
				/>
			</v-col>
		</v-row>
	</v-dialog>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { onKeyStroke } from "@vueuse/core";
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

		return {
			close,
			download,
			isLightBoxOpen,
			lightBoxOptions,
			mdiClose,
			mdiFileDocumentOutline,
			mdiTrayArrowDown,
			isImageLoading,
		};
	},
});
</script>
