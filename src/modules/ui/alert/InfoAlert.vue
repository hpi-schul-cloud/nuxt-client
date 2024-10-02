<template>
	<BaseAlert
		color="info"
		:icon="mdiInformation"
		:closeIcon="mdiClose"
		:showCloseIcon="showCloseIcon"
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
	setup() {
		return { mdiInformation, mdiClose };
	},
	props: {
		showCloseIcon: {
			type: Boolean,
			default: false,
		},
	},
});
</script>
