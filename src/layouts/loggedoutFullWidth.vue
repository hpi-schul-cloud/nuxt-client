<template>
	<div>
		<navigation-bar
			:links="navbarItems"
			:img="require('@assets/img/logo/logo-image-color.svg')"
			:buttons="true"
		/>
		<div class="nuxt-container">
			<Nuxt />
		</div>
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";
import navbarBaseItems from "@utils/navbarBaseItems.js";

/**
 * used by page mint-ec/_article only
 */
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
				if (item.title.includes(".")) {
					item.title = this.$t(`${item.title}`);
				}
				return item;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.nuxt-container {
	width: 100%;
}
</style>
