<template>
	<VCardText>
		<div class="d-flex justify-center w-full">
			<VBtn
				@click.stop="onAddElement('text')"
				@dblclick.stop="() => {}"
				elevation="0"
				outlined
				icon
				large
			>
				<v-icon>{{ mdiPlus }}</v-icon>
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
		};
	},
});
</script>
