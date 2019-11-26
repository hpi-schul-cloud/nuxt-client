<template>
	<navigation-bar>
		<div class="container">
			<Nuxt />
		</div>
	</navigation-bar>
</template>

<script>
import NavigationBar from "@components/molecules/NavigationBar";
export default {
	components: {
		NavigationBar,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	width: 100%;
}
</style>
