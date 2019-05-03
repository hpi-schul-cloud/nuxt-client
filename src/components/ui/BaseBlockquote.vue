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
	props: {
		cite: {
			type: String,
			default: "",
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
