<template>
	<pre id="versioninfo">{{ info }}</pre>
</template>

<script>
export default {
	layout: "plain",
	head() {
		return {
			title: "nuxtversion",
		};
	},
	data() {
		return {
			info: process.env.GIT_INFO,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
