<template>
	<BaseAlert color="warning" :icon="mdiAlert"> <slot /> </BaseAlert>
</template>

<script lang="ts">
import { mdiAlert } from "@icons/material";
import { defineComponent } from "vue";
import BaseAlert from "./BaseAlert.vue";

export default defineComponent({
	name: "WarningAlert",
	components: { BaseAlert },

	setup() {
		return { mdiAlert };
	},
});
</script>
