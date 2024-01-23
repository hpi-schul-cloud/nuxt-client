<template>
	<div>
		<v-btn
			icon
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
			data-testId="datasheetAction"
			:aria-label="
				$t(
					'components.administration.externalToolsSection.action.createDatasheet'
				)
			"
			@click="$emit('datasheet')"
		>
			<v-icon> {{ mdiFileDocumentOutline }}</v-icon>
		</v-btn>
		<v-btn
			icon
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

<script lang="ts">
import { defineComponent } from "vue";
import {
	mdiFileDocumentOutline,
	mdiPencilOutline,
	mdiTrashCanOutline,
} from "@mdi/js";

export default defineComponent({
	name: "ExternalToolToolbar",
	emits: ["delete", "edit", "datasheet"],
	setup() {
		return {
			mdiPencilOutline,
			mdiTrashCanOutline,
			mdiFileDocumentOutline,
		};
	},
});
</script>
