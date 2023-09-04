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
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";

export default defineComponent({
	name: "ExternalToolToolbar",
	emits: ["delete", "edit"],
	setup() {
		return {
			mdiPencilOutline,
			mdiTrashCanOutline,
		};
	},
});
</script>
