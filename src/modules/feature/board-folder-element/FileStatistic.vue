<template>
	<span v-if="fileStatistics" class="text-caption" data-testid="file-statistic">
		{{ `${fileStatistics?.fileCount} ${fileTranslation} ⋅ ${humanReadableFileSize}` }}
	</span>
	<FolderAlerts v-else :alerts="alerts" />
</template>

<script setup lang="ts">
import { FolderAlert } from "./FolderAlert.enum";
import FolderAlerts from "./FolderAlerts.vue";
import { useFolderAlerts } from "./useFolderAlerts.composable";
import { FileRecordParent } from "@/types/file/File";
import { formatFileSize } from "@/utils/fileHelper";
import { useFileStorageApi } from "@data-file";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

interface FileStatisticProps {
	elementId: string;
}

const props = defineProps<FileStatisticProps>();

const { tryGetParentStatisticFromApi, getStatisticByParentId } = useFileStorageApi();
const { alerts, addAlert } = useFolderAlerts();

const fileStatistics = computed(() => {
	const statistics = getStatisticByParentId(props.elementId);

	return statistics;
});

const { t } = useI18n();

const humanReadableFileSize = computed(() => {
	const localizedString = formatFileSize(fileStatistics.value?.totalSizeInBytes || 0);

	return localizedString;
});

const fileTranslation = computed(() => {
	const isSingleFile = fileStatistics.value?.fileCount === 1;

	if (isSingleFile) {
		return t("common.file");
	} else {
		return t("common.files");
	}
});

onMounted(async () => {
	try {
		await tryGetParentStatisticFromApi(props.elementId, FileRecordParent.BOARDNODES);
	} catch {
		addAlert(FolderAlert.FILE_STORAGE_ERROR);
	}
});
</script>
