<template>
	<div>
		<navigation-bar
			:links="links"
			:img="require('@assets/img/logo/logo-image-color.svg')"
		>
			<template v-slot:actions>
				<base-button design="secondary outline" to="/community">{{
					$t("common.labels.register")
				}}</base-button>
				<base-button design="secondary" to="/login">
					<base-icon source="fa" icon="sign-in" />
					{{ $t("common.labels.login") }}
				</base-button>
			</template>
		</navigation-bar>

		<div class="container">
			<Nuxt />
		</div>
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";
import BaseButton from "@components/base/BaseButton";

export default {
	components: {
		NavigationBar,
		BaseButton,
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
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	width: 100%;
}
</style>
