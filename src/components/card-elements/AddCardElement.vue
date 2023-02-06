<template>
	<v-card flat class="dashed mb-4">
		<v-col class="text-center">
			<v-btn
				icon
				outlined
				color="secondary"
				class="add-element-btn"
				data-testid="add-element-btn"
				@click="addElement"
			>
				<v-icon>{{ mdiPlus }}</v-icon>
			</v-btn>
		</v-col>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiPlus } from "@mdi/js";

export default defineComponent({
	name: "AddCardElement",
	components: {},
	emits: ["click"],
	props: {
		value: {
			type: Array,
			default: () => [],
		},
	},
	setup(props, { emit }) {
		const addElement = () => emit("click");

		return {
			addElement,
			mdiPlus,
		};
	},
});
</script>

<style lang="scss" scoped>
.dashed {
	border: dashed thin var(--v-grey-base);
}
</style>
