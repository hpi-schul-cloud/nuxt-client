<template>
	<div class="d-flex justify-center align-center mb-4">
		<hr class="dashed-divider" />
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
		<hr class="dashed-divider" />
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

.dashed-divider {
	flex: 1;
	border: 0;
	border-bottom: dashed thin map-get($grey, base);
}
</style>
