<template>
	<div>
		<navigation-bar
			:img="require('@assets/img/logo/logo-image-color.svg')"
			:logo-link="'/dashboard'"
			:buttons="false"
		/>
		<div class="nuxt-container">
			<Nuxt />
		</div>
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";

export default {
	components: {
		NavigationBar,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.nuxt-container {
	width: 100%;
	padding: var(--space-sm);
}

@include breakpoint(desktop) {
	.nuxt-container {
		padding: var(--space-xl-3);
	}
}
</style>
