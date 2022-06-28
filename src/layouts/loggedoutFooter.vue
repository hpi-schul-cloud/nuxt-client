<template>
	<div>
		<navigation-bar
			:buttons="true"
			:img="require('@assets/img/logo/logo-image-mono.svg')"
			:links="navbarItems"
		/>
		<div :class="isMobile ? 'small-wrapper' : 'wrapper'">
			<Nuxt />
		</div>
		<the-footer />
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";
import navbarBaseItems from "@/utils/navbarBaseItems";
import TheFooter from "@components/legacy/TheFooter";

export default {
	components: {
		NavigationBar,
		TheFooter,
	},
	data() {
		return {
			navbarBaseItems,
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
	grid-area: content;
	padding: var(--space-md);
}

.wrapper {
	grid-area: content;
	padding-right: calc(15 * var(--border-width));
	padding-left: calc(15 * var(--border-width));
	margin: var(--space-lg) auto;
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
