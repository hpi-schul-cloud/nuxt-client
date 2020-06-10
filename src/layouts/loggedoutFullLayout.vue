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

	.small-container {
		padding: var(--space-md);
	}

	.container {
		padding-right: calc(15 * var(--border-width));
		padding-left: calc(15 * var(--border-width));
		margin: auto;
	}

	@media (min-width: 576px) {
		.container {
			width: 540px;
			max-width: 100%;
		}
	}

	@media (min-width: 768px) {
		.container {
			width: 720px;
			max-width: 100%;
		}
	}

	@media (min-width: 992px) {
		.container {
			width: 960px;
			max-width: 100%;
		}
	}

	@media (min-width: 1200px) {
		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 1140px;
			max-width: 100%;
		}
	}
</style>
