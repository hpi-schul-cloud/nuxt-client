<template>
	<LinkContentElementDisplay :url="modelValue.url"></LinkContentElementDisplay>
	<!-- <div>{{ modelValue.url }}</div> -->
</template>

<script lang="ts">
import { LinkElementResponse } from "@/types/board/ContentElement";
import { useContentElementState } from "@data-board";
import { defineComponent } from "vue";
import { PropType } from "vue/types/umd";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";

export default defineComponent({
	name: "LinkElementContent",
	components: {
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
		const { modelValue } = useContentElementState(props);

		return { modelValue };
	},
});
</script>
