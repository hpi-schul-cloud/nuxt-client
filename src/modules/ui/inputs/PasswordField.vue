<template>
	<VTextField
		ref="passwordFieldRef"
		v-model="password"
		:type="fieldType"
		:prepend-inner-icon="mdiLockOutline"
		:append-inner-icon="visibilityIcon"
		@click:append-inner="isPasswordRevealed.value = !isPasswordRevealed.value"
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

const isPasswordRevealed = ref(false);
const visibilityIcon = computed(() => (isPasswordRevealed.value ? mdiEyeOutline : mdiEyeOffOutline));
const fieldType = computed(() => (isPasswordRevealed.value ? "text" : "password"));
</script>
