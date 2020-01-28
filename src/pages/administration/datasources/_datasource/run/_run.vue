<template>
	<div>
		<ol>
			<li>GET Status of current _run</li>
			<li>if status === pending => show loading modal</li>
			<li>if status === error => show error and back button</li>
			<li>if status === success => show table</li>
		</ol>
	</div>
</template>

<script>
export default {
	methods: {},
	head() {
		return {
			title: "result",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
