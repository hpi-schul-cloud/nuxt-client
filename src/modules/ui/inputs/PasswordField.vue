<template>
	<VTextField v-model="password" type="password" :prepend-inner-icon="mdiLockOutline" validate-on="blur" />
</template>

<script setup lang="ts">
import { mdiLockOutline } from "@icons/material";

const password = defineModel({
	type: String,
	default: "",
});
</script>
