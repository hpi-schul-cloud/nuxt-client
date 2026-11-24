<template>
	<SvsDialog
		v-model="isOpen"
		title="feature-board-import.title"
		data-testid="board-import-dialog"
		confirm-btn-lang-key="common.actions.import"
		cancel-btn-lang-key="common.labels.close"
		is-open-state-managed-externally
		:is-loading="isStarting"
		:no-confirm="!!job"
		:confirm-btn-disabled="!link || isStarting"
		@confirm="startImport(link, targetType, targetId)"
		@cancel="onClose"
	>
		<template #content>
			<VTextField
				v-if="!job"
				v-model="link"
				:label="t('feature-board-import.dialog.link')"
				data-testid="board-import-link"
			/>
			<dl v-else>
				<dt>{{ t("feature-board-import.dialog.jobId") }}</dt>
				<dd data-testid="board-import-job-id">{{ job.id }}</dd>
				<dt>{{ t("common.labels.status") }}</dt>
				<dd data-testid="board-import-job-status">{{ job.status }}</dd>
			</dl>
			<ErrorAlert v-if="hasError" data-testid="board-import-error">
				{{ t("feature-board-import.dialog.error") }}
			</ErrorAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { BoardImportTargetType } from "@api-board-import";
import { useBoardImportJob } from "@data-board-import";
import { ErrorAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
	targetType: BoardImportTargetType;
	targetId: string;
}>();

const isOpen = defineModel({ type: Boolean, default: false });

const { t } = useI18n();
const { job, hasError, isStarting, startImport, reset } = useBoardImportJob();

const link = ref("");

const onClose = () => {
	isOpen.value = false;
	link.value = "";
	reset();
};
</script>
