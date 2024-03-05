<template>
	<v-dialog
		ref="commonCartridgeImportDialog"
		v-model="isOpen"
		:max-width="props.maxWidth"
		data-testid="common-cartridge-import-dialog"
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
				/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<div class="button-section">
					<v-btn data-testId="dialog-cancel-btn" depressed @click="cancel">
						{{ $t("common.labels.close") }}
					</v-btn>
				</div>
				<div class="button-section">
					<v-btn
						v-bind:disabled="importButtonDisabled"
						v-on:click="confirm"
						color="primary"
						data-testId="dialog-confirm-btn"
					>
						{{ $t("pages.rooms.ccImportCourse.confirm") }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from "vue";
import {
	commonCartridgeImportModule,
	loadingStateModule,
	notifierModule,
	roomsModule,
} from "@/store";
import { mdiTrayArrowUp } from "@mdi/js";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const props = withDefaults(
	defineProps<{
		maxWidth: number;
	}>(),
	{
		maxWidth: 480,
	}
);
const file = ref<File[]>([]);
const isOpen = computed({
	get: () => commonCartridgeImportModule.isOpen,
	set: () => commonCartridgeImportModule.closeImportModal(),
});
const importButtonDisabled = computed(() => {
	return !file.value;
});

function cancel(): void {
	commonCartridgeImportModule.closeImportModal();
}

async function confirm(): Promise<void> {
	const [selectedFile] = file.value;

	commonCartridgeImportModule.closeImportModal();
	loadingStateModule.open({
		text: i18n.t("pages.rooms.ccImportCourse.loading"),
	});

	await commonCartridgeImportModule.importCommonCartridgeFile(selectedFile);

	if (commonCartridgeImportModule.isSuccess) {
		await Promise.allSettled([
			roomsModule.fetch(),
			roomsModule.fetchAllElements(),
		]);
		loadingStateModule.close();
		const [{ title }] = roomsModule.allElements;
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

	file.value = [];
}
</script>

<style lang="scss" scoped>
.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
}
</style>
