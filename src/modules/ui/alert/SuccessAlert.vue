<template>
	<BaseAlert color="success" :icon="mdiCheckCircle">
		<slot />
	</BaseAlert>
</template>

<script setup lang="ts">
import BaseAlert from "./BaseAlert.vue";
import { mdiCheckCircle } from "@icons/material";
</script>
