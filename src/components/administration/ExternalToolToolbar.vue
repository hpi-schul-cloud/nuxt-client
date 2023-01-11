<template>
	<div>
		<v-btn icon data-testId="editAction" role="button" @click="$emit('edit')">
			<span class="d-sr-only">{{ $t("common.actions.edit") }}</span>
			<v-icon>
				{{ mdiPencilOutline }}
			</v-icon>
		</v-btn>
		<v-btn icon data-testId="deleteAction" role="button" @click="$emit('delete')">
			<span class="d-sr-only">{{ $t("common.actions.remove") }}</span>
			<v-icon>
				{{ mdiTrashCanOutline }}
			</v-icon>
		</v-btn>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
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
