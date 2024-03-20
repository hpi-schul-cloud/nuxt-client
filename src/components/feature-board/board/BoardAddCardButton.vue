<template>
	<div
		class="d-flex w-100 justify-center button-background pb-4 pt-2 pr-6 text-center sticky"
		style="height: 4rem"
		ref="sticky"
	>
		<VBtn
			@click.stop="onAddCard"
			@dblclick.stop="() => {}"
			elevation="6"
			class="bg-white"
			icon
			v-if="!isEditMode"
		>
			<VIcon>{{ mdiPlus }}</VIcon>
			<span class="d-sr-only" data-testid="add-card">{{
				$t("components.board.action.addCard")
			}}</span>
		</VBtn>
	</div>
</template>

<script lang="ts">
import { mdiPlus } from "@mdi/js";
import { computed, defineComponent } from "vue";
import { useSharedEditMode } from "@data-board";

export default defineComponent({
	name: "BoardAddCardButton",
	emits: ["add-card"],
	setup(props, { emit }) {
		const { editModeId } = useSharedEditMode();
		const onAddCard = () => emit("add-card");

		const isEditMode = computed(() => editModeId.value !== undefined);
		return {
			mdiPlus,
			onAddCard,
			isEditMode,
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
	width: 380px;
}
</style>
