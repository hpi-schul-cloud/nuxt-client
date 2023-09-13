<template>
	<v-card-text class="grey lighten-3 pa-2">
		<v-textarea
			rows="1"
			auto-grow
			v-model="modelValue.alternativeText"
			class="v-secondary-lighten1"
			persistent-hint="true"
			:hint="$t('components.cardElement.fileElement.altDescription')"
			:label="$t('components.cardElement.fileElement.alternativeText')"
		/>
	</v-card-text>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { useContentElementState } from "@data-board";
import { defineComponent, PropType, toRef } from "vue";

export default defineComponent({
	name: "AlternativeText",
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
	setup(props) {
		const element = toRef(props, "element");
		const { modelValue } = useContentElementState({
			element: element.value,
			isEditMode: true,
		});

		return {
			modelValue,
		};
	},
});
</script>
