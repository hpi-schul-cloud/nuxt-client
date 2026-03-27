<template>
	<VDialog
		ref="commonCartridgeImportModal"
		v-model="isOpen"
		:max-width="props.maxWidth"
		data-testid="common-cartridge-import-modal"
		@click:outside="onCancel()"
		@keydown.esc="onCancel()"
	>
		<VCard :ripple="false">
			<template #title>
				<h2 class="mt-2">
					{{ t("pages.rooms.ccImportCourse.title") }}
				</h2>
			</template>
			<template #text>
				<VFileInput
					v-model="file"
					class="truncate-file-input"
					:label="t('pages.rooms.ccImportCourse.fileInputLabel')"
					:prepend-icon="mdiTrayArrowUp"
					accept=".imscc, .zip"
					clearable
					show-size
					data-testid="dialog-file-input"
				/>
			</template>
			<template #actions>
				<VSpacer />
				<div class="mb-2">
					<VBtn data-testid="dialog-cancel-btn" variant="outlined" class="ml-2 mr-2" @click="onCancel">
						{{ t("common.labels.close") }}
					</VBtn>
				</div>
				<div class="mb-2">
					<VBtn
						type="submit"
						variant="flat"
						color="primary"
						:disabled="importButtonDisabled"
						data-testid="dialog-confirm-btn"
						class="ml-2 mr-2"
						@click="onConfirm"
					>
						{{ t("pages.rooms.ccImportCourse.confirm") }}
					</VBtn>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { COMMON_CARTRIDGE_IMPORT_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifyError, notifySuccess, useLoadingStore } from "@data-app";
import { useCourseRoomListStore } from "@data-courses";
import { mdiTrayArrowUp } from "@icons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const commonCartridgeImportModule = injectStrict(COMMON_CARTRIDGE_IMPORT_MODULE_KEY);
const { setLoadingState } = useLoadingStore();
const { fetch, fetchAllElements } = useCourseRoomListStore();

const props = withDefaults(
	defineProps<{
		maxWidth?: number;
	}>(),
	{
		maxWidth: 480,
	}
);
const file = computed<File | undefined>({
	get: () => commonCartridgeImportModule.file,
	set: (value: File | undefined) => commonCartridgeImportModule.setFile(value),
});
const isOpen = computed<boolean>({
	get: () => commonCartridgeImportModule.isOpen,
	set: (value: boolean) => commonCartridgeImportModule.setIsOpen(value),
});
const importButtonDisabled = computed(() => !file.value);

function onCancel(): void {
	file.value = undefined;
	commonCartridgeImportModule.setIsOpen(false);
}

async function onConfirm(): Promise<void> {
	commonCartridgeImportModule.setIsOpen(false);
	setLoadingState(true, t("pages.rooms.ccImportCourse.loading"));

	if (file.value) {
		await commonCartridgeImportModule.importCommonCartridgeFile(file.value);
	}

	setLoadingState(false);

	await Promise.allSettled([fetch(), fetchAllElements()]);

	if (commonCartridgeImportModule.isSuccess) {
		notifySuccess(t("pages.rooms.ccImportCourse.success"));
	} else {
		notifyError(t("pages.rooms.ccImportCourse.error"));
	}

	file.value = undefined;
}
</script>

<style lang="scss" scoped>
:deep(.truncate-file-input .v-field__input) {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 100%;
}
</style>
