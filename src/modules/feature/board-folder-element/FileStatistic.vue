<template>
	<span v-if="fileStatistics" class="text-caption" data-testid="file-statistic">
		{{ `${fileStatistics?.fileCount} ${fileTranslation} ⋅ ${humanReadableFileSize}` }}
	</span>
</template>

<script setup lang="ts">
import { formatFileSize } from "@/utils/fileHelper";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

interface FileStatisticProps {
	fileStatistics?: {
		fileCount: number;
		totalSizeInBytes: number;
	};
}

const props = defineProps<FileStatisticProps>();

const { t } = useI18n();

const humanReadableFileSize = computed(() => {
	const localizedString = formatFileSize(props.fileStatistics?.totalSizeInBytes || 0);

	return localizedString;
});

const fileTranslation = computed(() => {
	const isSingleFile = props.fileStatistics?.fileCount === 1;

	if (isSingleFile) {
		return t("common.file");
	} else {
		return t("common.files");
	}
});
</script>
