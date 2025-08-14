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
import { mdiInformation, mdiClose } from "@icons/material";
import BaseAlert from "./BaseAlert.vue";

interface Props {
	showCloseIcon?: boolean;
	alertTitle?: string;
}

const { showCloseIcon = false, alertTitle = undefined } = defineProps<Props>();
</script>
