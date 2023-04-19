<template>
	<div class="d-flex justify-center w-full" ref="column">
		<div ref="columnend"></div>
		<VBtn
			@click.stop="onAddCard"
			@dblclick.stop="() => {}"
			elevation="0"
			outlined
			icon
			large
			:class="{ sticky: isSticky && !overTheTop }"
		>
			<v-icon>{{ mdiPlus }}</v-icon>
			<span class="d-sr-only">Add Card</span>
		</VBtn>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { mdiPlus } from "@mdi/js";
import { useElementVisibility } from "@vueuse/core";
import { useElementBounding } from "@vueuse/core";

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
			bounding,
			isSticky,
			targetIsVisible,
			overTheTop,
			onAddCard,
			mdiPlus,
		};
	},
});
</script>

<style>
.sticky {
	position: fixed;
	z-index: 1000;
	bottom: 10px;
}
</style>
