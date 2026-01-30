<template>
	<BaseAlert color="error" :icon="mdiAlertCircle">
		<slot />
	</BaseAlert>
</template>

<script setup lang="ts">
import BaseAlert from "./BaseAlert.vue";
import { mdiAlertCircle } from "@icons/material";
</script>
