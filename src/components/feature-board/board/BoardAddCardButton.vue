<template>
	<div class="d-flex w-full justify-center" ref="column">
		<div ref="columnend"></div>
		<div
			ref="sticky"
			class="button-background pb-4 pt-2 text-center"
			:class="{ sticky: isSticky && !overTheTop }"
		>
			<VBtn
				@click.stop="onAddCard"
				@dblclick.stop="() => {}"
				elevation="0"
				outlined
				icon
				large
			>
				<v-icon>{{ mdiPlus }}</v-icon>
				<span class="d-sr-only">Add Card</span>
			</VBtn>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { mdiPlus } from "@mdi/js";
import { useElementVisibility, useElementBounding } from "@vueuse/core";

export default defineComponent({
	name: "BoardAddCardButton",
	emits: ["add-card"],
	setup(props, { emit }) {
		const onAddCard = () => emit("add-card");
		const columnend = ref(null);
		const targetIsVisible = useElementVisibility(columnend);
		const isSticky = computed(() => targetIsVisible.value === false);
		const bounding = useElementBounding(columnend);
		const overTheTop = computed(() => bounding.y.value < 0);

		return {
			columnend,
			isSticky,
			overTheTop,
			onAddCard,
			mdiPlus,
		};
	},
});
</script>

<style scoped>
.sticky {
	position: fixed;
	z-index: 1;
	bottom: 0px;
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
