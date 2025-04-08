<template>
	<div>
		<InfoAlert v-if="alerts.includes(AudioRecordAlert.VIDEO_FORMAT_ERROR)">
			{{ t("components.cardElement.audioRecordElement.videoFormatError") }}
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(AudioRecordAlert.AUDIO_FORMAT_ERROR)">
			{{ t("components.cardElement.audioRecordElement.audioFormatError") }}
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(AudioRecordAlert.AWAITING_SCAN_STATUS)">
			<div>
				{{ t("components.cardElement.audioRecordElement.awaitingScan") }}
				<a href="#" @click.prevent="onStatusReload">
					{{ t("components.cardElement.audioRecordElement.reloadStatus") }}
				</a>
			</div>
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(AudioRecordAlert.SCAN_STATUS_WONT_CHECK)">
			{{ t("components.cardElement.audioRecordElement.scanWontCheck") }}
		</InfoAlert>

		<ErrorAlert v-if="alerts.includes(AudioRecordAlert.SCAN_STATUS_BLOCKED)">
			{{ t("components.cardElement.audioRecordElement.virusDetected") }}
		</ErrorAlert>

		<WarningAlert v-if="alerts.includes(AudioRecordAlert.SCAN_STATUS_ERROR)">
			{{ t("components.cardElement.audioRecordElement.scanError") }}
		</WarningAlert>
	</div>
</template>

<script lang="ts">
import { ErrorAlert, InfoAlert, WarningAlert } from "@ui-alert";
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { AudioRecordAlert } from "../types/AudioRecordAlert.enum";

export default defineComponent({
	name: "AudioRecordAlert",
	components: { InfoAlert, ErrorAlert, WarningAlert },
	props: {
		alerts: {
			type: Array as PropType<AudioRecordAlert[]>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const { t } = useI18n();

		const onStatusReload = () => {
			emit("on-status-reload");
		};

		return {
			AudioRecordAlert,
			onStatusReload,
			t,
		};
	},
});
</script>
