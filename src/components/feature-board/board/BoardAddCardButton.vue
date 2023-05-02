<template>
	<div class="d-flex w-full justify-center" ref="column">
		<div ref="columnend" class="columnend"></div>
		<div
			ref="sticky"
			class="button-background pb-4 pt-2 text-center sticky"
			:style="stickyStyle"
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
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { mdiPlus } from "@mdi/js";
import {
	useDebounceFn,
	useElementVisibility,
	useElementBounding,
} from "@vueuse/core";

export default defineComponent({
	name: "BoardAddCardButton",
	emits: ["add-card"],
	setup(props, { emit }) {
		const onAddCard = () => emit("add-card");

		const columnend = ref(null);
		const isColumnEndVisible = useElementVisibility(columnend);
		const bounding = useElementBounding(columnend);
		const buttonX = ref(0);

		const setX = (x: number) => (buttonX.value = Math.round(x - 200));

		const debouncedX = useDebounceFn(setX, 10, { maxWait: 200 });

		watch(bounding.x, (newValue) => {
			debouncedX(newValue);
		});

		const stickyStyle = computed(() => {
			if (isColumnEndVisible.value === false && bounding.y.value > 0) {
				return {
					position: "fixed",
					"z-index": 1,
					bottom: "0px",
					left: `${buttonX.value}px`,
				};
			} else {
				return {
					position: "static",
				};
			}
		});

		return {
			columnend,
			mdiPlus,
			stickyStyle,
			onAddCard,
		};
	},
});
</script>

<style scoped>
.sticky {
	transition: left 0.1s ease;
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
