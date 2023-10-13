<template>
	<BaseAlert color="info" :icon="mdiInformation"> <slot></slot> </BaseAlert>
</template>

<script lang="ts">
import { mdiInformation } from "@mdi/js";
import { defineComponent } from "vue";
import BaseAlert from "./BaseAlert.vue";

export default defineComponent({
	name: "InfoAlert",
	components: { BaseAlert },
	setup() {
		return { mdiInformation };
	},
});
</script>
