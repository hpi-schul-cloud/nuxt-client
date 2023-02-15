<template>
	<div style="padding: 25px, border: 1px solid black">
		A Card!
		{{ id }} - {{ height }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "CardHost",
	props: {
		height: { type: Number, required: true },
		id: { type: String, required: true },
	},
	setup() {
		return {};
	},
});
</script>
