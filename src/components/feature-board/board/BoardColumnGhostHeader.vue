<template>
	<div class="mb-4 pt-2" ref="headerRef">
		<div class="d-flex align-start justify-space-between pa-2">
			<VBtn
				elevation="0"
				variant="text"
				:color="isColumnActive ? 'text-black' : 'text-grey-darken-2'"
				@click="onAddColumn"
			>
				<VIcon>{{ mdiPlus }}</VIcon>
				{{
					boardType === "column-board"
						? $t("components.board.column.ghost.placeholder")
						: "Reihe hinzufügen"
				}}
			</VBtn>
		</div>
		<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
	</div>
</template>

<script lang="ts">
import { mdiPlus } from "@mdi/js";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "BoardColumnGhostHeader",
	props: {
		isColumnActive: {
			type: Boolean,
			required: true,
		},
		boardType: {
			type: String as PropType<"column-board" | "media-shelf">,
			default: "column-board",
		},
	},
	emits: ["add-column"],
	setup(props, { emit }) {
		const onAddColumn = () => {
			emit("add-column");
		};
		return { onAddColumn, mdiPlus };
	},
});
</script>

<style scoped>
.margin-fix {
	margin-top: 2px;
}

.transition-divider {
	transition: all ease-in 150ms;
}
</style>
