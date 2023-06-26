<template>
	<VListItem @click.prevent="onClick($event)">
		<VListItemTitle><slot></slot></VListItemTitle>
	</VListItem>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "BoardMenuAction",
	setup(props, { emit }) {
		const onClick = ($event: MouseEvent) => emit("click", $event);
		return {
			onClick,
		};
	},
});
</script>
