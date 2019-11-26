<template>
	<div class="nav-container">
		<div class="logo-container"> </div>
		<div class="link-container">
			<base-link v-for="route in links" :key="route.to" :to="`${route.to}`">{{
				route.title
			}}</base-link>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		logo: {
			type: String,
			default: "",
		},
		links: {
			type: Array,
			reqired: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
