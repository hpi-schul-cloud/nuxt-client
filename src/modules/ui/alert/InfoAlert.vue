<template>
	<BaseAlert
		color="info"
		:icon="mdiInformation"
		:close-icon="mdiClose"
		:show-close-icon="showCloseIcon"
	>
		<slot />
	</BaseAlert>
</template>

<script lang="ts">
import { mdiInformation, mdiClose } from "@icons/material";
import { defineComponent } from "vue";
import BaseAlert from "./BaseAlert.vue";

export default defineComponent({
	name: "InfoAlert",
	components: { BaseAlert },
	props: {
		showCloseIcon: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		return { mdiInformation, mdiClose };
	},
});
</script>
