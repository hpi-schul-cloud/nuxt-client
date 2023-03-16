<template>
	<v-list-item @click.prevent="onClick">
		<v-list-item-title><slot></slot></v-list-item-title>
	</v-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "CardHostMenuAction",
	setup(props, { emit }) {
		const onClick = () => emit("click");

		return {
			onClick,
		};
	},
});
</script>
