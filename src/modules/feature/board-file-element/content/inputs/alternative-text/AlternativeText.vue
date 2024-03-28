<template>
	<v-textarea
		data-testid="file-alttext-input"
		rows="1"
		auto-grow
		v-model="modelValue"
		:persistent-hint="true"
		:hint="$t('components.cardElement.fileElement.altDescription')"
		:label="$t('components.cardElement.fileElement.alternativeText')"
	/>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "AlternativeText",
	props: {
		alternativeText: {
			type: String,
			required: false,
		},
	},
	emits: ["update:alternativeText"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "alternativeText", emit);

		return {
			modelValue,
		};
	},
});
</script>
