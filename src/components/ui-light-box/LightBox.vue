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
				<img
					:src="lightBoxOptions.previewUrl"
					:alt="lightBoxOptions.alt"
					style="max-height: 100%; max-width: 100%"
					@click.stop
				/>
			</div>
		</v-overlay>
	</v-dialog>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { onKeyStroke } from "@vueuse/core";
import { defineComponent } from "vue";
import { useInternalLightBox } from "./LightBox.composable";
import { ContentElementTitleIcon, ContentElementTitle } from "@ui-board";

export default defineComponent({
	name: "LightBox",
	components: { ContentElementTitle, ContentElementTitleIcon },
	setup() {
		const { close, isLightBoxOpen, lightBoxOptions } = useInternalLightBox();

		onKeyStroke("Escape", (e) => close(), { eventName: "keydown" });

		const download = async () => {
			await downloadFile(
				lightBoxOptions.value.downloadUrl,
				lightBoxOptions.value.name
			);
		};

		return {
			close,
			download,
			isLightBoxOpen,
			lightBoxOptions,
			mdiClose,
			mdiFileDocumentOutline,
			mdiTrayArrowDown,
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
