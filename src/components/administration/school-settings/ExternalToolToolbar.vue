<template>
	<div>
		<VBtn
			:icon="mdiPencilOutline"
			variant="text"
			data-testId="editAction"
			:title="t('components.administration.externalToolsSection.action.edit')"
			:aria-label="t('components.administration.externalToolsSection.action.edit')"
			@click="$emit('edit')"
		/>
		<VBtn
			:icon="mdiFileDocumentOutline"
			variant="text"
			data-testId="datasheetAction"
			:title="t('components.administration.externalToolsSection.action.showDatasheet')"
			:aria-label="t('components.administration.externalToolsSection.action.showDatasheet')"
			@click="$emit('datasheet')"
		/>
		<VBtn
			:icon="mdiTrashCanOutline"
			variant="text"
			data-testId="deleteAction"
			:title="t('components.administration.externalToolsSection.action.delete')"
			:aria-label="t('components.administration.externalToolsSection.action.delete')"
			@click="$emit('delete')"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiFileDocumentOutline, mdiPencilOutline, mdiTrashCanOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

defineEmits(["edit", "datasheet", "delete"]);

const { t } = useI18n();
</script>
