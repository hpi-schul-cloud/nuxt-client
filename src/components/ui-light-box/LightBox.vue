<template>
	<v-dialog fullscreen :value="isLightBoxOpen">
		<v-card style="background: rgba(27, 27, 27, 0.54)">
			<v-toolbar flat>
				<v-btn icon @click="close">
					<v-icon>{{ mdiClose }}</v-icon>
				</v-btn>
				<v-toolbar-title
					v-if="lightBoxOptions.name !== ''"
					class="d-flex align-items-center"
				>
					<v-icon color="black" class="mr-2" size="18">{{
						mdiFileDocumentOutline
					}}</v-icon>

					<span class="subtitle-1 font-weight-bold text-truncate mr-8">{{
						lightBoxOptions.name
					}}</span>
				</v-toolbar-title>
				<v-spacer />
				<v-btn v-if="lightBoxOptions.downloadUrl !== ''" icon @click="download">
					<v-icon>{{ mdiTrayArrowDown }}</v-icon>
				</v-btn>
			</v-toolbar>
			<v-card-text
				class="d-flex align-items-center justify-content-center pt-5"
				style="height: calc(100vh - 64px)"
				@click="close"
			>
				<img
					:src="lightBoxOptions.previewUrl"
					:alt="lightBoxOptions.alt"
					style="max-height: 100%; max-width: 100%"
					@click.stop
				/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { downloadFile } from "@/utils/fileHelper";
import { mdiClose, mdiFileDocumentOutline, mdiTrayArrowDown } from "@mdi/js";
import { onKeyStroke } from "@vueuse/core";
import { defineComponent } from "vue";
import { useInternalLightBox } from "./LightBox.composable";

export default defineComponent({
	name: "LightBox",
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
