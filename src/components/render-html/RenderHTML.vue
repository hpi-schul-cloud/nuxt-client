<template>
	<span v-dompurify-html="html"></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "RenderHTML",
	props: {
		html: { type: String, required: true },
	},
});
</script>
