<template>
	<BaseAlert color="success" :icon="mdiCheckCircle"> <slot /> </BaseAlert>
</template>

<script lang="ts">
import { mdiCheckCircle } from "@mdi/js";
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
