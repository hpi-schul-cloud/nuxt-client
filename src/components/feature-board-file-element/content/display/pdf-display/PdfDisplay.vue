<template>
	<ContentElementBar @click="onClick">
		<template #title> <a :href="src" target="_blank">Click Here</a></template>
	</ContentElementBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ContentElementBar } from "@ui-board";

export default defineComponent({
	name: "PdfDisplay",
	components: { ContentElementBar },
	props: {
		src: { type: String, required: true },
	},
	setup(props) {
		const onClick = () => {
			window.open(props.src, "_blank");
		};

		return {
			onClick,
		};
	},
});
</script>
