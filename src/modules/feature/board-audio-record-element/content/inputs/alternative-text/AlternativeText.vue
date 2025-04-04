<template>
	<v-textarea
		data-testid="file-alttext-input"
		rows="1"
		auto-grow
		v-model="modelValue"
		:persistent-hint="true"
		:hint="$t('components.cardElement.audioRecordElement.altDescription')"
		:label="$t('components.cardElement.audioRecordElement.alternativeText')"
	/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "AlternativeText",
	props: {
		alternativeText: {
			type: String,
			required: false,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["update:alternativeText"],
	setup(props, { emit }) {
		const modelValue = ref("");

		onMounted(() => {
			if (props.alternativeText !== undefined) {
				modelValue.value = props.alternativeText;
			}
		});

		watch(modelValue, (newValue) => {
			if (newValue !== props.alternativeText) {
				emit("update:alternativeText", newValue);
			}
		});

		return {
			modelValue,
		};
	},
});
</script>
