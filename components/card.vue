<template>
	<article class="customcard">
		<div class="customcard-header">
			<slot name="header">Header</slot>
		</div>
		<div class="customcard-content">
			<slot><!-- CONTENT -->CONTENT</slot>
		</div>
		<div class="customcard-footer">
			<slot name="footer">FOOTER</slot>
		</div>
	</article>
</template>

<script>
export default {
	name: "Card",
};
</script>

<style scoped>
.customcard {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	padding: 16px;
	overflow: hidden;
	border: 1px solid grey;
	border-radius: 20px;
}
</style>
