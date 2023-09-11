<template>
	<v-card-text class="grey lighten-3">
		<v-text-field
			v-model="modelValue.alternativeText"
			class="v-secondary-lighten1"
			rows="1"
			:hint="$t('components.cardElement.fileElement.altDescription')"
			:label="$t('components.cardElement.fileElement.alternativeText')"
		></v-text-field>
	</v-card-text>
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
