<template>
	<v-dialog fullscreen hide-overlay :value="isLightBoxOpen">
		<v-toolbar flat>
			<v-btn icon @click="close">
				<v-icon>{{ mdiClose }}</v-icon>
			</v-btn>

			<ContentElementTitleIcon :icon="mdiFileDocumentOutline" class="mr-2" />

			<v-toolbar-title v-if="lightBoxOptions.name !== ''">
				<ContentElementTitle>{{ lightBoxOptions.name }}</ContentElementTitle>
			</v-toolbar-title>
			<v-spacer />
			<v-btn v-if="lightBoxOptions.downloadUrl !== ''" icon @click="download">
				<v-icon>{{ mdiTrayArrowDown }}</v-icon>
			</v-btn>
		</v-toolbar>

		<v-overlay absolute class="mt-16 pa-4" @click="close">
			<div
				class="d-flex align-items-center justify-content-center"
				style="height: 100%"
			>
				<VProgressCircular
					v-if="isImageLoading"
					color="primary"
					indeterminate
					:size="36"
				/>

				<img
					v-show="!isImageLoading"
					:src="lightBoxOptions.previewUrl"
					:alt="lightBoxOptions.alt"
					style="max-height: 100%; max-width: 100%"
					@click.stop
					@load="isImageLoading = false"
				/>
			</div>
		</v-overlay>
	</v-dialog>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { onKeyStroke } from "@vueuse/core";
import { defineComponent, ref, watch } from "vue";
import { useInternalLightBox } from "./LightBox.composable";
import { ContentElementTitleIcon, ContentElementTitle } from "@ui-board";

export default defineComponent({
	name: "LightBox",
	components: { ContentElementTitle, ContentElementTitleIcon },
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

<style scoped>
.v-overlay >>> .v-overlay__content {
	height: 100%;
	width: 100%;
}
</style>
