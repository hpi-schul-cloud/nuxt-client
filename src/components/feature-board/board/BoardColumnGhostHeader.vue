<template>
	<div class="mb-4" ref="headerRef">
		<div class="py-2 d-flex align-start justify-space-between">
			<VBtn
				elevation="0"
				text
				:color="isColumnActive ? 'black' : 'grey darken-2'"
				@click="onAddColumn"
				><VIcon>{{ mdiPlus }}</VIcon> Spalte hinzufügen</VBtn
			>
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
	transition: all 150ms;
}
</style>
