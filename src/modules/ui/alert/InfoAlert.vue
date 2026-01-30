<template>
	<BaseAlert
		color="info"
		:icon="mdiInformation"
		:close-icon="mdiClose"
		:show-close-icon="showCloseIcon"
		:alert-title="alertTitle"
	>
		<slot />
	</BaseAlert>
</template>

<script setup lang="ts">
import BaseAlert from "./BaseAlert.vue";
import { mdiClose, mdiInformation } from "@icons/material";

const { showCloseIcon = false, alertTitle = undefined } = defineProps<{
	showCloseIcon?: boolean;
	alertTitle?: string;
}>();
</script>
