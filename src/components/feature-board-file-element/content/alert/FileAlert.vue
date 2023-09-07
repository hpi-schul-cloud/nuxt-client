<template>
	<v-alert
		v-if="showAlert"
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
			<a
				href="#"
				v-if="alertProperties.actionText"
				@click.prevent="onStatusReload"
			>
				{{ $t(alertProperties.actionText) }}
			</a>
		</div>
	</v-alert>
</template>

<script lang="ts">
import { PreviewStatus } from "@/fileStorageApi/v3";
import { computed, defineComponent, PropType } from "vue";

interface Props {
	color: string;
	icon: string;
	text: string;
	actionText?: string;
}

export default defineComponent({
	name: "FileAlert",
	props: {
		previewStatus: {
			type: String as PropType<PreviewStatus>,
			required: true,
		},
	},
	emits: ["on-status-reload"],
	setup(props, { emit }) {
		const properties: { [key: string]: Props } = {
			[PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED]: {
				color: "error",
				icon: "$error",
				text: "components.cardElement.fileElement.virusDetected",
			},
			[PreviewStatus.AWAITING_SCAN_STATUS]: {
				color: "info",
				icon: "$info",
				text: "components.cardElement.fileElement.awaitingScan",
				actionText: "components.cardElement.fileElement.reloadStatus",
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

		const onStatusReload = () => {
			emit("on-status-reload");
		};

		return {
			alertProperties,
			PreviewStatus,
			showAlert,
			onStatusReload,
		};
	},
});
</script>
