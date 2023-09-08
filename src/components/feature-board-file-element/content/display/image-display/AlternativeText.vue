<template>
	<div>
		<v-textarea
			v-model="modelValue.alternativeText"
			class="pa-0 ma-0 v-secondary-lighten1"
			rows="1"
			:label="$t('components.cardElement.fileElement.altDescription')"
			:placeholder="$t('components.cardElement.fileElement.alternativeText')"
		></v-textarea>
	</div>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { useContentElementState } from "@data-board";
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "AlternativeText",
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	setup(props) {
		const { modelValue } = useContentElementState({
			element: props.element,
			isEditMode: true,
		});

		return {
			modelValue,
		};
	},
});
</script>
