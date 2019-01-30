<template>
	<div class="customcard-footer">
		<slot/>
	</div>
</template>

<script>
export default {
	name: "CardFooter",
};
</script>

<style scoped>
.customcard-footer {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	width: 100%;
}
</style>
