<template>
	<VListItem @click.prevent="onClick">
		<VListItemIcon class="mr-2"><slot name="icon"></slot></VListItemIcon>
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
