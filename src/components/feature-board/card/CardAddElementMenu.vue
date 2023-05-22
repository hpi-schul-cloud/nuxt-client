<template>
	<VCardText>
		<div class="d-flex justify-center w-full">
			<VBtn
				@click.stop="onAddElement(ContentElementType.RICH_TEXT)"
				@dblclick.stop="() => {}"
				elevation="0"
				outlined
				icon
				large
				data-testid="add-element-btn"
			>
				<VIcon>{{ mdiPlus }}</VIcon>
				<span class="d-sr-only">Add Element</span>
			</VBtn>
		</div>
	</VCardText>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mdiPlus } from "@mdi/js";
import { ContentElementType } from "../types/ContentElement";

export default defineComponent({
	name: "CardAddElementMenu",
	emits: ["add-element"],
	setup(props, { emit }) {
		const onAddElement = (type: ContentElementType) =>
			emit("add-element", type);

		return {
			onAddElement,
			mdiPlus,
			ContentElementType,
		};
	},
});
</script>
