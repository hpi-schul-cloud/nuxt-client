<template>
	<div>
		<navigation-bar :links="links" />
		<div class="container">
			<Nuxt />
		</div>
	</div>
</template>

<script>
import NavigationBar from "@components/molecules/NavigationBar";

export default {
	components: {
		NavigationBar,
	},

	data() {
		return {
			links: [
				// {
				// 	title: "Intro",
				// 	href: "https://schul-cloud.org/#",
				// },
				{
					title: "Projekt",
					href: "/about",
				},
				{
					title: "Mitmachen",
					href: "/community",
				},
				{
					title: "Blog",
					href: "https://blog.schul-cloud.org/",
				},
				{
					title: "FAQ",
					href:
						"https://blog.schul-cloud.org/faq",
				},
				{
					title: "Onboarding",
					href: "/mint-ec/mint-ec-willkommenspaket",
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	width: 100%;
}
</style>
