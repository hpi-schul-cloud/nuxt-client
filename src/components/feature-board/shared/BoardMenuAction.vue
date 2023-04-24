<template>
	<VListItem @click.prevent="onClick">
		<v-list-item-title><slot></slot></v-list-item-title>
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
