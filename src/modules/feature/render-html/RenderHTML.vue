<template>
	<component :is="component" v-dompurify-html:[config]="html" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
	name: "RenderHTML",
	props: {
		component: { type: String, default: "div" },
		html: { type: String, required: true },
		config: {
			type: String as PropType<"ck5" | "translations">,
			default: "translations",
		},
	},
});
</script>
