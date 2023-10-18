<template>
	<embed :src="src" type="application/pdf" width="100%" height="600px" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "PdfDisplay",
	props: {
		src: { type: String, required: true },
	},
	setup(props) {
		return {};
	},
});
</script>
