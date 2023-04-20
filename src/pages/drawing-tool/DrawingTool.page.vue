<template>
	<div class="d-flex flex-column">
		<p>TLDRAW</p>
		<a href="/tldraw-client" target="_blank">NEW WINDOW</a>
		<iframe src="/tldraw-client" width="600px" height="600px"></iframe>
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
