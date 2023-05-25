<template>
	<component :is="component" v-dompurify-html="html" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "RenderHTML",
	props: {
		component: { type: String, default: "div" },
		html: { type: String, required: true },
	},
});
</script>
