<template>
	<div class="mb-4">
		<LinkContentElementDisplay
			v-if="computedModel.url"
			:url="computedModel.url"
			:title="computedModel.title"
			:imageUrl="computedModel.imageUrl"
		></LinkContentElementDisplay>
		<LinkContentElementEdit v-if="!computedModel.url" @create:url="onCreateUrl">
		</LinkContentElementEdit>
	</div>
</template>

<script lang="ts">
import { LinkElementResponse } from "@/serverApi/v3";
import { useContentElementState } from "@data-board";
import { computed, defineComponent } from "vue";
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
		const { modelValue, responseValue } = useContentElementState(props, {
			autoSaveDebounce: 0,
		});

		const computedModel = computed(() => ({
			...modelValue.value,
			...responseValue.value.content,
			url: modelValue.value.url,
		}));

		const onCreateUrl = (url: string) => {
			modelValue.value.url = url;
		};

		return { computedModel, modelValue, onCreateUrl };
	},
});
</script>
