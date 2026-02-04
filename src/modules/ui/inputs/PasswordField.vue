<template>
	<VTextField
		v-model="password"
		:type="fieldType"
		:prepend-inner-icon="mdiLockOutline"
		:append-inner-icon="visibilityIcon"
		validate-on="blur"
		@click:append-inner="toggleVisibility"
	/>
</template>

<script setup lang="ts">
import { mdiEyeOffOutline, mdiEyeOutline, mdiLockOutline } from "@icons/material";
import { computed, ref } from "vue";

const password = defineModel({
	type: String,
	default: "",
});

const isHidden = ref(true);
const visibilityIcon = computed(() => (isHidden.value ? mdiEyeOffOutline : mdiEyeOutline));
const fieldType = computed(() => (isHidden.value ? "password" : "text"));

const toggleVisibility = () => {
	isHidden.value = !isHidden.value;
};
</script>
