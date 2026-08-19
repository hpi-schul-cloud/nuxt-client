<template>
	<component :is="component" v-dompurify-html:[config]="html" />
</template>

<script setup lang="ts">
type Props = {
	component?: string;
	html: string;
	config?: "richText" | "richTextNoLinks";
};

withDefaults(defineProps<Props>(), {
	component: "div",
	config: "richText",
});
</script>
