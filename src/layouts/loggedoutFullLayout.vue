<template>
	<div>
		<navigation-bar
			:links="navbarItems"
			:img="require('@assets/img/logo/logo-image-color.svg')"
			:buttons="true"
		/>
		<div :class="isMobile ? 'small-wrapper' : 'wrapper'">
			<Nuxt />
		</div>
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";
import navbarBaseItems from "@utils/navbarBaseItems.js";

/**
 * used by page login-instances only
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
		isMobile() {
			return this.$mq === "mobile";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.small-wrapper {
	padding: var(--space-md);
}

.wrapper {
	padding-right: calc(15 * var(--border-width));
	padding-left: calc(15 * var(--border-width));
	margin: auto;
}

@media (min-width: 576px) {
	.wrapper {
		width: 540px;
		max-width: 100%;
	}
}

@media (min-width: 768px) {
	.wrapper {
		width: 720px;
		max-width: 100%;
	}
}

@media (min-width: 992px) {
	.wrapper {
		width: 960px;
		max-width: 100%;
	}
}

@media (min-width: 1200px) {
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 1140px;
		max-width: 100%;
	}
}
</style>
