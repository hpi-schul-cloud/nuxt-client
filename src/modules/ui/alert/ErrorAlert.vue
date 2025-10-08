<template>
	<BaseAlert color="error" :icon="mdiAlertCircle"> <slot /> </BaseAlert>
</template>

<script lang="ts">
import BaseAlert from "./BaseAlert.vue";
import { mdiAlertCircle } from "@icons/material";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ErrorAlert",
	components: { BaseAlert },

	setup() {
		return { mdiAlertCircle };
	},
});
</script>
