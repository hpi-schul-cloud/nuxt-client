<template>
	<div class="d-flex">
		<p>TLDRAW</p>
		<a href="localhost:4000/tldraw-test" target="_blank">NEW WINDOW</a>
		<iframe src="/tldraw-test" width="600px" height="600px"></iframe>
	</div>
</template>

<script>
export default {
	render() {
		return h("div", "elo");
	},
};
</script>
<style lang="scss" scoped></style>
