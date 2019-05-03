<template>
	<base-link class="link" v-bind="$attrs">
		<slot />
	</base-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@styles";

.link {
	padding: 12px 16px;
	color: black;
	text-decoration: none;

	&:hover {
		background-color: #f1f1f1;
	}
}
</style>
