<template>
	<div>
		<navigation-bar
			:links="navbarItems"
			:img="require('@assets/img/logo/logo-image-color.svg')"
		/>
		<div :class="isMobile ? 'small-container' : 'container'">
			<Nuxt />
		</div>
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";
import navbarBaseItems from "@utils/navbarBaseItems.js";

export default {
	components: {
		NavigationBar,
	},
	data() {
		return {
			navbarBaseItems: navbarBaseItems,
		};
	},
	computed: {
		navbarItems() {
			return this.navbarBaseItems.map((item) => {
				if (item.title.includes('.')) {
					item.title = this.$t(`${item.title}`);
				}
				return item
			})
		},
		isMobile() {
			return this.$mq === "mobile";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	padding: var(--space-xl-3);
}

.small-container {
	padding: var(--space-md);
}
</style>
