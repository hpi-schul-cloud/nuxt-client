<template>
	<blockquote :cite="cite">
		<slot />
	</blockquote>
</template>

<script>
export default {
	name: "Quote",
	props: {
		cite: {
			type: String,
			required: true,
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
