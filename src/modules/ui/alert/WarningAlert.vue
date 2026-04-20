<template>
	<BaseAlert color="warning" :icon="mdiAlert">
		<slot />
	</BaseAlert>
</template>

<script setup lang="ts">
import BaseAlert from "./BaseAlert.vue";
import { mdiAlert } from "@icons/material";
</script>
