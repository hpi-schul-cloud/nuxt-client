<template>
	<div>
		<v-icon data-testId="editAction" role="button" @click="$emit('edit')">
			{{ mdiPencilOutline }}
		</v-icon>
		<v-icon data-testId="deleteAction" role="button" @click="$emit('delete')">
			{{ mdiTrashCanOutline }}
		</v-icon>
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
