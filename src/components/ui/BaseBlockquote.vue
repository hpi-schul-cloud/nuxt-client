<template>
	<blockquote :cite="cite">
		<slot />
		<footer>
			<a :href="cite">Source</a>
		</footer>
	</blockquote>
</template>

<script>
export default {
	name: "BaseBlockquote",
	props: {
		cite: {
			type: String,
			required: true,
		},
		sourceText: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

blockquote::after {
	display: block;
	margin-top: 1em;
	font-size: 0.8em;
	content: "Von: " attr(cite);
}
</style>
