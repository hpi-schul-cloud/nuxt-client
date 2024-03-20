<template>
	<v-chip
		size="small"
		class="room-card-chip py-1"
		color="warning-lighten-1"
		variant="flat"
	>
		<v-icon size="small" class="mr-1" color="warning">{{ mdiAlert }}</v-icon>
		<slot />
	</v-chip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiAlert } from "@mdi/js";

export default defineComponent({
	name: "RoomCardChip",
	setup() {
		return {
			mdiAlert,
		};
	},
});
</script>

<style scoped>
.room-card-chip {
	width: fit-content;
}
</style>
