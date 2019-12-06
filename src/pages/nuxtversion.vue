<template>
	<pre id="versioninfo">{{ info }}</pre>
</template>

<script>
export default {
	layout: "plain",
	data() {
		return {
			info: process.env.GIT_INFO,
		};
	},
	head() {
		return {
			title: "nuxtversion",
		};
	},
	meta: {
		isPublic: true,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
