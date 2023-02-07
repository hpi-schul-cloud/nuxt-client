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
	emits: ["click"],
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
$btn-radius: 18;

.dashed {
	border: dashed thin var(--v-grey-base);
}

.add-element-btn {
	position: absolute;
	top: -#{$btn-radius / 3}px;
	left: 50%;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin-left: -#{$btn-radius}px;
	background-color: var(--v-white-base);
}
</style>
