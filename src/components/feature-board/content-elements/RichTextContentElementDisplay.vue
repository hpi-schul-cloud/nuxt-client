<!-- eslint-disable vue/no-v-html -->
<template>
	<div v-html="value" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "RichTextContentElementDisplay",
	props: {
		value: {
			type: String,
			required: true,
		},
	},
});
</script>
