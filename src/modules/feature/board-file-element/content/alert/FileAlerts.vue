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
				{{ t("common.file.awaitingScan") }}
				<a href="#" @click.prevent="onStatusReload">
					{{ t("components.cardElement.fileElement.reloadStatus") }}
				</a>
			</div>
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_WONT_CHECK)">
			{{ t("common.file.scanWontCheck") }}
		</InfoAlert>

		<InfoAlert v-if="alerts.includes(FileAlert.EXCEEDS_COLLABORA_EDITABLE_FILE_SIZE)">
			{{
				t("common.file.exceedsCollaboraEditableFileSize", {
					sizeInMb: maxCollaboraFileSizeWithUnit,
				})
			}}
		</InfoAlert>

		<ErrorAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_BLOCKED)">
			{{ t("common.file.virusDetected") }}
		</ErrorAlert>

		<WarningAlert v-if="alerts.includes(FileAlert.SCAN_STATUS_ERROR)">
			{{ t("common.file.scanError") }}
		</WarningAlert>
	</div>
</template>

<script setup lang="ts">
import { FileAlert } from "../../shared/types/FileAlert.enum";
import { formatFileSize } from "@/utils/fileHelper";
import { useEnvFileConfig } from "@data-env";
import { ErrorAlert, InfoAlert, WarningAlert } from "@ui-alert";
import { useI18n } from "vue-i18n";

type Props = {
	alerts: FileAlert[];
};

defineProps<Props>();

const emit = defineEmits<{
	(e: "on-status-reload"): void;
}>();

const { t } = useI18n();
const maxCollaboraFileSizeWithUnit = formatFileSize(useEnvFileConfig().value?.COLLABORA_MAX_FILE_SIZE_IN_BYTES);

const onStatusReload = () => {
	emit("on-status-reload");
};
</script>
