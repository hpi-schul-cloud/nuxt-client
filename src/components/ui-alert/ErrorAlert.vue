<template>
	<BaseAlert color="error" :icon="mdiAlertCircle"> <slot /> </BaseAlert>
</template>

<script lang="ts">
import { mdiAlertCircle } from "@mdi/js";
import { defineComponent } from "vue";
import BaseAlert from "./BaseAlert.vue";

export default defineComponent({
	name: "ErrorAlert",
	components: { BaseAlert },

	setup() {
		return { mdiAlertCircle };
	},
});
</script>
