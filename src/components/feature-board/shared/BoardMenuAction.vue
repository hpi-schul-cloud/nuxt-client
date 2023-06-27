<template>
	<VListItem data-testid="board-menu-action" @click.prevent="onClick">
		<VListItemTitle><slot></slot></VListItemTitle>
	</VListItem>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { useBoardMenu } from "./BoardMenu.composable";

export default defineComponent({
	name: "BoardMenuAction",
	setup(props, { emit }) {
		const { isMenuOpen } = useBoardMenu();

		const onClick = async () => {
			emit("click");
			await nextTick();
			isMenuOpen.value = false;
		};

		return {
			onClick,
		};
	},
});
</script>
