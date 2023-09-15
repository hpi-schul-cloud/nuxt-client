<template>
	<v-card-text class="pa-2">
		<v-textarea
			rows="1"
			auto-grow
			v-model="modelValue"
			class="v-secondary-lighten1"
			persistent-hint="true"
			:hint="$t('components.cardElement.fileElement.altDescription')"
			:label="$t('components.cardElement.fileElement.alternativeText')"
		/>
	</v-card-text>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "AlternativeText",
	props: {
		text: {
			type: String,
			required: false,
		},
	},
	emits: ["update:text"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "text", emit);

		return {
			modelValue,
		};
	},
});
</script>
