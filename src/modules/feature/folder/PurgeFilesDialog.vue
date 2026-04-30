<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="pages.folder.trash.purge.dialog.title"
		:confirm-btn-lang-key="'pages.folder.trash.purge.action'"
		:confirm-btn-disabled="!isConfirmed"
		data-testid="purge-files-dialog"
		@confirm="emit('confirm')"
		@cancel="emit('cancel')"
	>
		<template #content>
			<p data-testid="purge-files-dialog-description">
				{{ t("pages.folder.trash.purge.dialog.description", { count: fileCount }) }}
			</p>
			<VCheckbox
				v-model="isConfirmed"
				:label="t('pages.folder.trash.purge.dialog.checkboxLabel')"
				data-testid="purge-files-dialog-checkbox"
				density="compact"
				class="mt-1"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
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

const isConfirmed = ref(false);

watch(isDialogOpen, (newVal) => {
	if (!newVal) {
		isConfirmed.value = false;
	}
});
</script>
