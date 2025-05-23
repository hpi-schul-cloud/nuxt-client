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
			<v-card-title>
				<div ref="textTitle" class="text-h4 my-2 text-break">
					{{ $t("pages.rooms.ccImportCourse.title") }}
				</div>
			</v-card-title>
			<v-card-text class="text--primary">
				<v-file-input
					v-model="file"
					:label="$t('pages.rooms.ccImportCourse.fileInputLabel')"
					:prepend-icon="mdiTrayArrowUp"
					accept=".imscc, .zip"
					clearable
					show-size
					data-testid="dialog-file-input"
				/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<div class="button-section">
					<v-btn
						data-testid="dialog-cancel-btn"
						variant="outlined"
						@click="onCancel"
					>
						{{ $t("common.labels.close") }}
					</v-btn>
				</div>
				<div class="button-section">
					<v-btn
						type="submit"
						variant="flat"
						color="primary"
						:disabled="importButtonDisabled"
						data-testid="dialog-confirm-btn"
						@click="onConfirm"
					>
						{{ $t("pages.rooms.ccImportCourse.confirm") }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { mdiTrayArrowUp } from "@icons/material";
import { useI18n } from "vue-i18n";
import {
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	COURSE_ROOM_LIST_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";

const i18n = useI18n();
const courseRoomListModule = injectStrict(COURSE_ROOM_LIST_MODULE_KEY);
const loadingStateModule = injectStrict(LOADING_STATE_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const commonCartridgeImportModule = injectStrict(
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY
);
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
const importButtonDisabled = computed(() => {
	return !file.value;
});

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

	if (commonCartridgeImportModule.isSuccess) {
		await Promise.allSettled([
			courseRoomListModule.fetch(),
			courseRoomListModule.fetchAllElements(),
		]);
		loadingStateModule.close();
		const title = courseRoomListModule.getAllElements[0]?.title;
		notifierModule.show({
			status: "success",
			text: i18n.t("pages.rooms.ccImportCourse.success", { name: title }),
			autoClose: true,
		});
	} else {
		loadingStateModule.close();
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
.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
	margin-right: calc(var(--space-base-vuetify) * 2);
}
</style>
