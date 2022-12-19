<template>
	<v-card flat class="mb-6">
		<v-btn
			fab
			outlined
			color="secondary"
			x-small
			class="delete-element-btn"
			data-testid="delete-element-btn"
			@click="() => $emit('delete-element')"
		>
			<v-icon size="18">{{ mdiTrashCanOutline }}</v-icon>
		</v-btn>
		<v-btn
			fab
			outlined
			color="secondary"
			x-small
			class="drag-element-btn handle"
			data-testid="drag-element-btn"
		>
			<v-icon size="18">{{ mdiDragHorizontalVariant }}</v-icon>
		</v-btn>
		<slot />
	</v-card>
</template>

<script lang="ts">
import { mdiTrashCanOutline, mdiDragHorizontalVariant } from "@mdi/js";

export default {
	setup() {
		return {
			mdiTrashCanOutline,
			mdiDragHorizontalVariant,
		};
	},
};
</script>

<style lang="scss" scoped>
.delete-element-btn {
	position: absolute;
	top: -5px;
	right: -20px;
	background-color: var(--v-white-base);
}

.drag-element-btn {
	position: absolute;
	top: 32px;
	right: -20px;
	z-index: var(--layer-page);
	background-color: var(--v-white-base);
}
</style>
