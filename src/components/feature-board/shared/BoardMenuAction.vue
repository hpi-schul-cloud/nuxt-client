<template>
	<VListItem @click="onClick($event)" @keydown.enter="onClick($event)">
		<VListItemTitle><slot></slot></VListItemTitle>
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
