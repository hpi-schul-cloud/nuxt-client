<template>
	<div class="mb-4">
		<LinkContentElementDisplay
			v-if="computedElement.content.url"
			:url="computedElement.content.url"
			:title="computedElement.content.title"
			:imageUrl="computedElement.content.imageUrl"
			:isLoading="isLoading"
		></LinkContentElementDisplay>
		<LinkContentElementEdit
			v-if="!computedElement.content.url"
			@create:url="onCreateUrl"
		>
		</LinkContentElementEdit>
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
	emits: ["delete:element"],
	setup(props, { emit }) {
		const { modelValue, computedElement, isLoading } = useContentElementState(
			props,
			{ autoSaveDebounce: 0 }
		);

		const onCreateUrl = (url: string) => {
			modelValue.value.url = url;
		};

		return {
			computedElement,
			modelValue,
			onCreateUrl,
			isLoading,
		};
	},
});
</script>
