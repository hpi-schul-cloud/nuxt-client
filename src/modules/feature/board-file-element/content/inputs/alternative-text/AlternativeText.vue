<template>
	<v-textarea
		v-model="modelValue"
		data-testid="file-alttext-input"
		rows="1"
		auto-grow
		:persistent-hint="true"
		:hint="$t('components.cardElement.fileElement.altDescription')"
		:label="$t('components.cardElement.fileElement.alternativeText')"
	/>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
	alternativeText: {
		type: String,
		required: false,
		default: undefined,
	},
	isEditMode: { type: Boolean, required: true },
});
const emit = defineEmits<{
	(e: "update:alternativeText", alternativeText: string): void;
}>();

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
</script>
