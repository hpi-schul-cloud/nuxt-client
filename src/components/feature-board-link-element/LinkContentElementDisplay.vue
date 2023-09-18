<template>
	<div>{{ url }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "LinkContentElementDisplay",
	components: {},
	props: {
		url: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>
