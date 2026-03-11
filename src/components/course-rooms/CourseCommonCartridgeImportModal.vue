<template>
	<v-dialog
		ref="commonCartridgeImportModal"
		v-model="isOpen"
		:max-width="props.maxWidth"
		data-testid="common-cartridge-import-modal"
		@click:outside="onCancel()"
		@keydown.esc="onCancel()"
	>
		<v-card :ripple="false">
			<template #title>
				<h2 class="mt-2">
					{{ t("pages.rooms.ccImportCourse.title") }}
				</h2>
			</template>
			<template #text>
				<v-file-input
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
				<v-spacer />
				<div class="mb-2">
					<v-btn data-testid="dialog-cancel-btn" variant="outlined" class="ml-2 mr-2" @click="onCancel">
						{{ t("common.labels.close") }}
					</v-btn>
				</div>
				<div class="mb-2">
					<v-btn
						type="submit"
						variant="flat"
						color="primary"
						:disabled="importButtonDisabled"
						data-testid="dialog-confirm-btn"
						class="ml-2 mr-2"
						@click="onConfirm"
					>
						{{ t("pages.rooms.ccImportCourse.confirm") }}
					</v-btn>
				</div>
			</template>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { COURSE_ROOM_LIST_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifyError, notifySuccess, useLoadingStore } from "@data-app";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { mdiTrayArrowUp } from "@icons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const courseRoomListModule = injectStrict(COURSE_ROOM_LIST_MODULE_KEY);
const { isOpen, isSuccess, file, setIsOpen, setIsSuccess, setFile, importCommonCartridgeFile } =
	useCommonCartridgeImport();
const { setLoadingState } = useLoadingStore();

const props = withDefaults(
	defineProps<{
		maxWidth?: number;
	}>(),
	{
		maxWidth: 480,
	}
);

const importButtonDisabled = computed(() => !file.value);

function onCancel(): void {
	setFile(undefined);
	setIsOpen(false);
}

async function onConfirm(): Promise<void> {
	setIsOpen(false);
	setLoadingState(true, t("pages.rooms.ccImportCourse.loading"));

	if (file.value) {
		await importCommonCartridgeFile(file.value);
	}

	setLoadingState(false);

	await Promise.allSettled([courseRoomListModule.fetch(), courseRoomListModule.fetchAllElements()]);

	if (isSuccess.value) {
		notifySuccess(t("pages.rooms.ccImportCourse.success"));
	} else {
		notifyError(t("pages.rooms.ccImportCourse.error"));
	}

	setFile(undefined);
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
