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
					{{ $t("pages.rooms.ccImportCourse.title") }}
				</h2>
			</template>
			<template #text>
				<v-file-input
					v-model="file"
					class="truncate-file-input"
					:label="$t('pages.rooms.ccImportCourse.fileInputLabel')"
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
						{{ $t("common.labels.close") }}
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
						{{ $t("pages.rooms.ccImportCourse.confirm") }}
					</v-btn>
				</div>
			</template>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import {
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	COURSE_ROOM_LIST_MODULE_KEY,
	injectStrict,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { mdiTrayArrowUp } from "@icons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const courseRoomListModule = injectStrict(COURSE_ROOM_LIST_MODULE_KEY);
const loadingStateModule = injectStrict(LOADING_STATE_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const commonCartridgeImportModule = injectStrict(COMMON_CARTRIDGE_IMPORT_MODULE_KEY);
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
	loadingStateModule.open({
		text: i18n.t("pages.rooms.ccImportCourse.loading"),
	});

	if (file.value) {
		await commonCartridgeImportModule.importCommonCartridgeFile(file.value);
	}

	loadingStateModule.close();

	await Promise.allSettled([courseRoomListModule.fetch(), courseRoomListModule.fetchAllElements()]);

	if (commonCartridgeImportModule.isSuccess) {
		const title = courseRoomListModule.getAllElements[0]?.title;
		notifierModule.show({
			status: "success",
			text: i18n.t("pages.rooms.ccImportCourse.success", { name: title }),
			autoClose: true,
		});
	} else {
		notifierModule.show({
			status: "error",
			text: i18n.t("pages.rooms.ccImportCourse.error"),
			autoClose: true,
		});
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
