<template>
	<div>
		<navigation-bar
				:links="navbarItems"
				:img="require('@assets/img/logo/logo-image-color.svg')"
		>
			<template v-slot:actions>
				<base-button design="secondary outline" to="/login">
					<base-icon source="fa" icon="sign-in" />
					{{ $t("common.labels.login") }}
				</base-button>
				<base-button design="secondary" to="/community">
					{{ $t("common.labels.register") }}
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
	import navbarBaseItems from "@utils/navbarBaseItems.js";

	export default {
		components: {
			NavigationBar,
			BaseButton,
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

	.container {
		width: 100%;
	}
</style>
