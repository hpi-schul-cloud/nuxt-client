<template>
	<div
		class="d-flex w-full justify-center button-background pb-4 pt-2 text-center"
		:class="{ sticky: isSticky }"
		ref="sticky"
	>
		<VBtn
			@click.stop="onAddCard"
			@dblclick.stop="() => {}"
			elevation="0"
			outlined
			icon
			large
		>
			<VIcon>{{ mdiPlus }}</VIcon>
			<span class="d-sr-only">Add Card</span>
		</VBtn>
	</div>
</template>

<script lang="ts">
import { mdiPlus } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardAddCardButton",
	emits: ["add-card"],
	props: {
		isSticky: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const onAddCard = () => emit("add-card");
		return {
			mdiPlus,
			onAddCard,
		};
	},
});
</script>

<style scoped>
.sticky {
	position: -webkit-sticky;
	position: sticky;
	z-index: 1;
	bottom: 0;
}
.button-background {
	background: #fff;
	background: linear-gradient(
		0deg,
		rgba(255, 255, 255, 1) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	width: 400px;
}
</style>
