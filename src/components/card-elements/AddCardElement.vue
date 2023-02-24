<template>
	<div class="mb-4">
		<hr />
		<v-btn
			icon
			outlined
			color="secondary"
			class="add-element-btn"
			:aria-label="$t('pages.taskCard.addElement')"
			data-testid="add-element-btn"
			@click="addElement"
		>
			<v-icon>{{ mdiPlus }}</v-icon>
		</v-btn>
		<hr />
	</div>
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

div {
	display: flex;
	justify-content: center;
	align-items: center;
}

hr {
	flex: 1;
	border: dashed thin var(--v-grey-base);
}
</style>
