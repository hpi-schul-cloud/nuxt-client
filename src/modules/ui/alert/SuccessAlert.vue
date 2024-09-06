<template>
	<BaseAlert color="success" :icon="mdiCheckCircle"> <slot /> </BaseAlert>
</template>

<script lang="ts">
import { mdiCheckCircle } from "@icons/material";
import { defineComponent } from "vue";
import BaseAlert from "./BaseAlert.vue";

export default defineComponent({
	name: "SuccessAlert",
	components: { BaseAlert },

	setup() {
		return { mdiCheckCircle };
	},
});
</script>
