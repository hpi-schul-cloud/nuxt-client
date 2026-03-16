<template>
	<VDialog
		ref="commonCartridgeImportModal"
		:model-value="isOpen"
		:max-width="props.maxWidth"
		data-testid="common-cartridge-import-modal"
		@update:model-value="$emit('update:isOpen', $event)"
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
import { mdiTrayArrowUp } from "@icons/material";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VBtn, VCard, VDialog, VFileInput } from "vuetify/components";

const { t } = useI18n();

const props = withDefaults(
	defineProps<{
		isOpen: boolean;
		maxWidth?: number;
	}>(),
	{
		maxWidth: 480,
	}
);

const emit = defineEmits<{
	"update:isOpen": [value: boolean];
	import: [file: File];
}>();

const file = ref<File[] | undefined>(undefined);

const importButtonDisabled = computed(() => !file.value || file.value.length === 0);

const onCancel = () => {
	file.value = undefined;
	emit("update:isOpen", false);
};

const onConfirm = () => {
	if (file.value && file.value.length > 0) {
		emit("import", file.value[0]);
		file.value = undefined;
	}
};
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
