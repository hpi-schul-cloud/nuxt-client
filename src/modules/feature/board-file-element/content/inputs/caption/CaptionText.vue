<template>
	<v-textarea
		v-model="modelValue"
		data-testid="file-caption-input"
		rows="1"
		auto-grow
		:label="$t('components.cardElement.fileElement.caption')"
		:hide-details="true"
	/>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
	caption: {
		type: String,
		default: undefined,
	},
	isEditMode: { type: Boolean, required: true },
});

const emit = defineEmits<{
	(e: "update:caption", caption: string): void;
}>();

const modelValue = ref("");

onMounted(() => {
	if (props.caption !== undefined) {
		modelValue.value = props.caption;
	}
});

watch(modelValue, (newValue) => {
	if (newValue !== props.caption) {
		emit("update:caption", newValue);
	}
});
</script>
