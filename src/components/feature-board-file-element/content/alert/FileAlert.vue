<template>
	<div>
		<div v-for="(alert, index) in alerts" :key="index">
			<component :is="alert" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "PreviewStatusAlert",
	props: {
		alerts: {
			// Add type for vue component array
			type: Array,
			required: true,
		},
	},
	emits: ["on-status-reload"],
	setup(props, { emit }) {
		return {};
	},
});
</script>
