<template>
	<blockquote :cite="cite">
		<slot />
		<footer
			>&mdash;
			<BaseLink :href="cite">{{ srcTxt }}</BaseLink>
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
		srcTxt: {
			type: String,
			default: "Source",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
