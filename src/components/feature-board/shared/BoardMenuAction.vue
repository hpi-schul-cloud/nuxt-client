<template>
	<VListItem data-testid="board-menu-action" @click.prevent="onClick">
		<VListItemTitle><slot></slot></VListItemTitle>
	</VListItem>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "BoardMenuAction",
	setup(props, { emit }) {
		const onClick = () => emit("click");
		return {
			onClick,
		};
	},
});
</script>
