<template>
	<blockquote :cite="cite">
		<slot />
		<footer v-if="cite"
			>&mdash;
			<BaseLink :href="cite">{{ srcText }}</BaseLink>
		</footer>
	</blockquote>
</template>

<script>
export default {
	name: "BaseBlockquote",
	props: {
		cite: {
			type: String,
		},
		srcText: {
			type: String,
			default: "Source",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
