<template>
	<div>
		<InfoAlert v-if="alerts.includes(FileAlert.VIDEO_FORMAT_ERROR)">
			Das Videoformat wird von diesem Browser / Betriebssystem nicht
			unterstützt.
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.AWAITING_SCAN_STATUS)">
			<div>
				{{ $t("components.cardElement.fileElement.awaitingScan") }}
				<a href="#" @click.prevent="onStatusReload">
					{{ $t("components.cardElement.fileElement.reloadStatus") }}
				</a>
			</div>
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_WONT_CHECK)">
			{{ $t("components.cardElement.fileElement.scanWontCheck") }}
		</InfoAlert>

		<ErrorAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_BLOCKED)">
			{{ $t("components.cardElement.fileElement.virusDetected") }}
		</ErrorAlert>

		<WarningAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_ERROR)">
			{{ $t("components.cardElement.fileElement.scanError") }}
		</WarningAlert>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import { InfoAlert, ErrorAlert, WarningAlert } from "@ui-alert";

export default defineComponent({
	name: "FileAlerts",
	components: { InfoAlert, ErrorAlert, WarningAlert },
	props: {
		alerts: { type: Array as PropType<FileAlert[]>, required: true },
	},
	setup(props, { emit }) {
		const onStatusReload = () => {
			emit("on-status-reload");
		};

		return {
			FileAlert,
			onStatusReload,
		};
	},
});
</script>
