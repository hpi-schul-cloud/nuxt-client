<template>
	<div
		ref="sticky"
		class="d-flex justify-center button-background pb-4 pt-2 sticky"
	>
		<VBtn
			v-if="!isEditMode"
			elevation="6"
			class="bg-white"
			icon
			:data-testid="dataTestid"
			@click.stop="onAddCard"
			@dblclick.stop="() => {}"
		>
			<VIcon>{{ mdiPlus }}</VIcon>
			<span class="d-sr-only">
				{{ $t("components.board.action.addCard") }}
			</span>
		</VBtn>
	</div>
</template>

<script setup lang="ts">
import { mdiPlus } from "@icons/material";
import { useSharedEditMode } from "@util-board";
import { computed } from "vue";

defineProps({
	dataTestid: {
		type: String,
		default: "add-card-btn",
	},
});

const emit = defineEmits(["add-card"]);

const { editModeId } = useSharedEditMode();
const onAddCard = () => emit("add-card");

const isEditMode = computed(() => editModeId.value !== undefined);
</script>

<style scoped>
.sticky {
	position: -webkit-sticky;
	position: sticky;
	z-index: 1;
	bottom: 0;
}
.button-background {
	height: 72px; /* button height(48px) + pb-4(16px) + pt-2(8px) */
	background: #fff;
	background: linear-gradient(
		0deg,
		rgba(255, 255, 255, 1) 50%,
		rgba(255, 255, 255, 0) 100%
	);
}
</style>
