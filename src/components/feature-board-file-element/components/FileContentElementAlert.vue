<template v-if="alertProperties.text">
	<v-alert
		class="mb-0 py-4 rounded-t-0"
		:color="alertProperties.color"
		data-testid="board-file-element-alert"
		dense
		:icon="alertProperties.icon"
		text
		variant="tonal"
	>
		<div class="black--text" v-if="alertProperties.text">
			{{ $t(alertProperties.text) }}
		</div>
	</v-alert>
</template>

<script lang="ts">
import { PreviewStatus } from "@/fileStorageApi/v3";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
	name: "FileContentElementAlert",
	props: {
		previewStatus: {
			type: Object as PropType<PreviewStatus>,
			required: true,
		},
	},
	setup(props) {
		const alertProperties = computed(() => {
			if (
				props.previewStatus ===
				PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED
			) {
				return {
					color: "error",
					icon: "$error",
					text: "components.cardElement.fileElement.virusDetected",
				};
			} else if (props.previewStatus === PreviewStatus.AWAITING_SCAN_STATUS) {
				return {
					color: "info",
					icon: "$info",
					text: "components.cardElement.fileElement.awaitingScan",
				};
			} else if (
				props.previewStatus ===
				PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
			) {
				return {
					color: "info",
					icon: "$info",
					text: "components.cardElement.fileElement.scanWontCheck",
				};
			} else if (
				props.previewStatus ===
				PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR
			) {
				return {
					color: "warning",
					icon: "$warning",
					text: "components.cardElement.fileElement.scanError",
				};
			} else {
				return {};
			}
		});
		return { alertProperties };
	},
});
</script>
