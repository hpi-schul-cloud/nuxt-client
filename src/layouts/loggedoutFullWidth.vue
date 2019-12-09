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
				{
					title: "Intro",
					href: "https://schul-cloud.org/#",
				},
				{
					title: "Über das Projekt",
					href: "https://schul-cloud.org/about",
				},
				{
					title: "Mitmachen",
					href: "https://schul-cloud.org/community",
				},
				{
					title: "Blog",
					href: "https://blog.schul-cloud.org/",
				},
				{
					title: "FAQ",
					href:
						"https://docs.schul-cloud.org/display/SCDOK/FAQs+zum+Projekt+HPI+Schul-Cloud",
				},
				{
					title: "Mint Ec",
					href: "http://localhost:4000/mint-ec/mint-ec-willkommenspaket",
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
