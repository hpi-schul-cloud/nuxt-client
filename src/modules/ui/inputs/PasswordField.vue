<template>
	<VTextField
		ref="passwordFieldRef"
		v-model="password"
		:type="fieldType"
		:prepend-inner-icon="mdiLockOutline"
		:append-inner-icon="visibilityIcon"
		@click:append-inner="toggleVisibility"
	/>
</template>

<script setup lang="ts">
import { mdiEyeOffOutline, mdiEyeOutline, mdiLockOutline } from "@icons/material";
import { computed, ref, useTemplateRef } from "vue";

const password = defineModel({
	type: String,
	default: "",
});

const passwordFieldRef = useTemplateRef("passwordFieldRef");

defineExpose({
	validate: async () => {
		await passwordFieldRef.value?.validate();
	},
});

const isHidden = ref(true);
const visibilityIcon = computed(() => (isHidden.value ? mdiEyeOffOutline : mdiEyeOutline));
const fieldType = computed(() => (isHidden.value ? "password" : "text"));

const toggleVisibility = () => {
	isHidden.value = !isHidden.value;
};
</script>
