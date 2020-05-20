<template>
	<div>
		<navigation-bar
			:links="links"
			:img="require('@assets/img/logo/logo-image-color.svg')"
		/>
		<div :class="isMobile ? 'small-container' : 'container'">
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
	data() {
		return {
			links: [
				{
					title: this.$t("layouts.loggedoutFullWidth.steps"),
					href: "/mint-ec/willkommenspaket",
				},
				{
					title: this.$t("layouts.loggedoutFullWidth.project"),
					href: "/about",
				},
				{
					title: this.$t("layouts.loggedoutFullWidth.join"),
					href: "/community",
				},
				{
					title: "Blog",
					href: "https://blog.schul-cloud.org/",
				},
				{
					title: "FAQ",
					href: "https://blog.schul-cloud.org/faq",
				},
			],
		};
	},
	computed: {
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
