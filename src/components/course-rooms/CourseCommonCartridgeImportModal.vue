<template>
	<SvsDialog
		v-model="isOpen"
		title="pages.rooms.ccImportCourse.title"
		data-testid="common-cartridge-import-modal"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="importButtonDisabled"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
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
	</SvsDialog>
</template>

<script setup lang="ts">
import { mdiTrayArrowUp } from "@icons/material";
import { SvsDialog } from "@ui-dialog";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VFileInput } from "vuetify/components";

const { t } = useI18n();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	import: [file: File];
}>();

const file = ref<File | undefined>();

const importButtonDisabled = computed(() => !file.value);

const onCancel = () => {
	file.value = undefined;
};

const onConfirm = () => {
	if (file.value) {
		emit("import", file.value);
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
