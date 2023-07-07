/* eslint-disable */
<template>
	<div class="d-flex flex-column">
		<p>TLDRAW</p>
		<a :href="`http://localhost:3046/${$route.params.id}`" target="_blank">
			NEW WINDOW
		</a>
		<!--		<a href="/tldraw-test" target="_blank">NEW WINDOW</a>-->
		<!--		<iframe src="/tldraw-test" width="600px" height="600px"></iframe>-->
		<iframe
			:src="`http://localhost:3046/${$route.params.id}`"
			width="600px"
			height="600px"
		></iframe>
	</div>
</template>

<script>
export default {
	data() {
		return {
			urlParams: new URLSearchParams(window.location.search),
		};
	},
	render() {
		return h("div", "elo");
	},
};
</script>
<style lang="scss" scoped></style>
