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
import { commonCartridgeImportModule } from "@/store";
import { mdiTrayArrowUp } from "@mdi/js";

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
	const [uploadedFile] = file.value;

	await commonCartridgeImportModule.importCommonCartridgeFile(uploadedFile);
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
