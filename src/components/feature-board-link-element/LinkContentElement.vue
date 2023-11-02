<template>
	<div class="mb-4" @keydown.up.down="onKeydownArrow">
		<LinkContentElementDisplay
			v-if="computedElement.content.url"
			:url="computedElement.content.url"
			:title="computedElement.content.title"
			:imageUrl="computedElement.content.imageUrl"
			:isLoading="isLoading"
		/>
		<LinkContentElementEdit
			v-if="!computedElement.content.url"
			@create:url="onCreateUrl"
		/>
	</div>
</template>

<script lang="ts">
import { LinkElementResponse } from "@/serverApi/v3";
import { useContentElementState } from "@data-board";
import { defineComponent } from "vue";
import { PropType } from "vue/types/umd";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import LinkContentElementEdit from "./LinkContentElementEdit.vue";

export default defineComponent({
	name: "LinkElementContent",
	components: {
		LinkContentElementEdit,
		LinkContentElementDisplay,
	},
	props: {
		element: {
			type: Object as PropType<LinkElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-keyboard:edit"],
	setup(props, { emit }) {
		const { modelValue, computedElement, isLoading } = useContentElementState(
			props,
			{ autoSaveDebounce: 0 }
		);

		const onCreateUrl = (url: string) => {
			modelValue.value.url = url;
		};

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		return {
			computedElement,
			modelValue,
			onCreateUrl,
			onKeydownArrow,
			isLoading,
		};
	},
});
</script>
