<template>
	<v-textarea
		data-testid="file-caption-input"
		rows="1"
		auto-grow
		v-model="modelValue"
		:label="$t('components.cardElement.fileElement.caption')"
		:hide-details="true"
	/>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "CaptionText",
	props: {
		caption: {
			type: String,
			required: false,
		},
	},
	emits: ["update:caption"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "caption", emit);

		return { modelValue };
	},
});
</script>
