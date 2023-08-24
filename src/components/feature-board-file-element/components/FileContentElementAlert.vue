<template v-if="showAlert">
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
		const defaultProps = { color: "", icon: "", text: "" };
		const properties = {
			[PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED]: {
				color: "error",
				icon: "$error",
				text: "components.cardElement.fileElement.virusDetected",
			},
			[PreviewStatus.AWAITING_SCAN_STATUS]: {
				color: "info",
				icon: "$info",
				text: "components.cardElement.fileElement.awaitingScan",
			},
			[PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK]: {
				color: "info",
				icon: "$info",
				text: "components.cardElement.fileElement.scanWontCheck",
			},
			[PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR]: {
				color: "warning",
				icon: "$warning",
				text: "components.cardElement.fileElement.scanError",
			},
			[PreviewStatus.PREVIEW_POSSIBLE]: {
				...defaultProps,
			},
			[PreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE]: {
				...defaultProps,
			},
		};

		const alertProperties = computed(() => {
			return properties[props.previewStatus];
		});

		const showAlert = computed(() => {
			return (
				props.previewStatus !== PreviewStatus.PREVIEW_POSSIBLE &&
				props.previewStatus !==
					PreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE
			);
		});

		return { alertProperties, PreviewStatus, showAlert };
	},
});
</script>
