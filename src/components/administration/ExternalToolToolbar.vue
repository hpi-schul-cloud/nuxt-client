<template>
	<div>
		<v-btn
			icon
			variant="text"
			data-testId="editAction"
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
			data-testId="deleteAction"
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
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";

defineEmits(["delete", "edit"]);
</script>
