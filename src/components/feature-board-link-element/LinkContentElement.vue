<template>
	<div class="mb-4">
		<LinkContentElementDisplay
			v-if="modelValue.url"
			:url="modelValue.url"
			:openGraphData="modelValue.openGraphData"
		></LinkContentElementDisplay>
		<LinkContentElementEdit v-if="!modelValue.url" @create:url="onCreateUrl">
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
		const { modelValue } = useContentElementState(props, {
			autoSaveDebounce: 0,
		});

		const onCreateUrl = (url: string) => {
			modelValue.value.url = url;
		};

		return { modelValue, onCreateUrl };
	},
});
</script>
