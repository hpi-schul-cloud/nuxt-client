<template>
	<div>
		<v-btn
			icon
			variant="text"
			data-testId="editAction"
			:title="$t('components.administration.externalToolsSection.action.edit')"
			:aria-label="
				$t('components.administration.externalToolsSection.action.edit')
			"
			@click="$emit('edit')"
		>
			<v-icon>
				{{ mdiPencilOutline }}
			</v-icon>
		</v-btn>
		<v-btn
			icon
			variant="text"
			data-testId="datasheetAction"
			:title="
				$t(
					'components.administration.externalToolsSection.action.showDatasheet'
				)
			"
			:aria-label="
				$t(
					'components.administration.externalToolsSection.action.showDatasheet'
				)
			"
			@click="$emit('datasheet')"
		>
			<v-icon> {{ mdiFileDocumentOutline }}</v-icon>
		</v-btn>
		<v-btn
			icon
			variant="text"
			data-testId="deleteAction"
			:title="
				$t('components.administration.externalToolsSection.action.delete')
			"
			:aria-label="
				$t('components.administration.externalToolsSection.action.delete')
			"
			@click="$emit('delete')"
		>
			<v-icon>
				{{ mdiTrashCanOutline }}
			</v-icon>
		</v-btn>
	</div>
</template>

<script setup lang="ts">
import {
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiFileDocumentOutline,
} from "@mdi/js";

defineEmits(["edit", "datasheet", "delete"]);
</script>
