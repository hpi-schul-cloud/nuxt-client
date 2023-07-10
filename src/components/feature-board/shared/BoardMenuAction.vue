<template>
	<VListItem data-testid="board-menu-action" @click.prevent="onClick">
		<VListItemIcon class="mr-2" data-testid="board-menu-action-icon"
			><slot name="icon"></slot
		></VListItemIcon>
		<VListItemTitle data-testid="board-menu-action-title"
			><slot></slot
		></VListItemTitle>
	</VListItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuAction",
	setup(props, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);
		return {
			onClick,
		};
	},
});
</script>
