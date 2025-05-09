<template>
	<div>
		<InfoAlert v-if="alerts.includes(FileAlert.VIDEO_FORMAT_ERROR)">
			{{ t("components.cardElement.fileElement.videoFormatError") }}
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.AUDIO_FORMAT_ERROR)">
			{{ t("components.cardElement.fileElement.audioFormatError") }}
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.AWAITING_SCAN_STATUS)">
			<div>
				{{ t("components.cardElement.fileElement.awaitingScan") }}
				<a href="#" @click.prevent="onStatusReload">
					{{ t("components.cardElement.fileElement.reloadStatus") }}
				</a>
			</div>
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_WONT_CHECK)">
			{{ t("components.cardElement.fileElement.scanWontCheck") }}
		</InfoAlert>

		<ErrorAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_BLOCKED)">
			{{ t("components.cardElement.fileElement.virusDetected") }}
		</ErrorAlert>

		<WarningAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_ERROR)">
			{{ t("components.cardElement.fileElement.scanError") }}
		</WarningAlert>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import { InfoAlert, ErrorAlert, WarningAlert } from "@ui-alert";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "FileAlerts",
	components: { InfoAlert, ErrorAlert, WarningAlert },
	props: {
		alerts: { type: Array as PropType<FileAlert[]>, required: true },
	},
	emits: ["on-status-reload"],
	setup(props, { emit }) {
		const { t } = useI18n();

		const onStatusReload = () => {
			emit("on-status-reload");
		};

		return {
			FileAlert,
			onStatusReload,
			t,
		};
	},
});
</script>
