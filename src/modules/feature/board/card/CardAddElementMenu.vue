<template>
	<VCardText>
		<div class="d-flex justify-center w-full">
			<VBtn
				elevation="0"
				variant="outlined"
				icon
				data-testid="add-element-btn"
				@click.stop="onAddElement()"
				@dblclick.stop="() => {}"
			>
				<VIcon>{{ mdiPlus }}</VIcon>
				<span class="d-sr-only"
					>{{ $t("components.elementTypeSelection.dialog.title") }}
				</span>
			</VBtn>
		</div>
	</VCardText>
</template>

<script lang="ts">
import { mdiPlus } from "@icons/material";
import { defineComponent } from "vue";

export default defineComponent({
	name: "CardAddElementMenu",
	emits: ["add-element"],
	setup(props, { emit }) {
		const onAddElement = () => emit("add-element");

		return {
			onAddElement,
			mdiPlus,
		};
	},
});
</script>
