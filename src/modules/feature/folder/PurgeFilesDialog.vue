<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="pages.folder.trash.purge.dialog.title"
		:confirm-btn-lang-key="'pages.folder.trash.purge.action'"
		:confirm-btn-disabled="!isConfirmInputValid"
		data-testid="purge-files-dialog"
		@confirm="emit('confirm')"
		@cancel="emit('cancel')"
	>
		<template #content>
			<p data-testid="purge-files-dialog-description">
				{{ t("pages.folder.trash.purge.dialog.description", { count: fileCount }) }}
			</p>
			<VTextField
				v-model="confirmInput"
				:label="t('pages.folder.trash.purge.dialog.inputLabel', { word: confirmationWord })"
				data-testid="purge-files-dialog-input"
				density="compact"
				flat
				class="mt-2"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	fileCount: {
		type: Number,
		required: true,
	},
});

const isDialogOpen = defineModel({
	type: Boolean,
	default: false,
});

const emit = defineEmits(["confirm", "cancel"]);

const { t } = useI18n();

const confirmationWord = computed(() => t("pages.folder.trash.purge.dialog.confirmationWord"));

const confirmInput = ref("");

watch(isDialogOpen, (newVal) => {
	if (!newVal) {
		confirmInput.value = "";
	}
});

const isConfirmInputValid = computed(
	() => confirmInput.value.trim().toLowerCase() === confirmationWord.value.trim().toLowerCase()
);
</script>
