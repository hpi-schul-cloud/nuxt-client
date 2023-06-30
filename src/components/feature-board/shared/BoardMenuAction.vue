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
import { defineComponent, nextTick } from "vue";
import { useBoardMenu } from "./BoardMenu.composable";

export default defineComponent({
	name: "BoardMenuAction",
	setup(props, { emit }) {
		const { isMenuOpen } = useBoardMenu();

		const onClick = async ($event: Event) => {
			emit("click", $event);
			await nextTick();
			isMenuOpen.value = false;
		};

		return {
			onClick,
		};
	},
});
</script>
