<template>
	<div class="mb-4 pt-1" ref="headerRef">
		<div class="d-flex align-start justify-space-between pt-2 mb-1">
			<VBtn
				elevation="0"
				text
				:color="isColumnActive ? 'black' : 'grey darken-2'"
				@click="onAddColumn"
			>
				<VIcon>{{ mdiPlus }}</VIcon>
				{{ $t("components.board.column.ghost.placeholder") }}
			</VBtn>
		</div>
		<VDivider
			:color="isColumnActive ? 'black' : 'grey'"
			class="margin-fix transition-divider"
		></VDivider>
	</div>
</template>

<script lang="ts">
import { mdiPlus } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardColumnGhostHeader",
	props: {
		isColumnActive: {
			type: Boolean,
			required: true,
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
