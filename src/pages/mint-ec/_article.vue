<template>
	<div>
		<mint-ec-page-header
			:image="page.feature_image"
			:heading="page.title"
			:teaser="page.excerpt"
		>
		</mint-ec-page-header>
		<base-content-container :style="{ marginTop: `var(--space-xl)` }">
			<render-html :html="page.html" />
		</base-content-container>
	</div>
</template>

<script>
import MintEcPageHeader from "@components/molecules/MintEcPageHeader";

import RenderHtml from "@components/molecules/RenderHtmlMintEc";
export default {
	components: {
		MintEcPageHeader,
		RenderHtml,
	},
	async asyncData({ store, params }) {
		const page = await store.dispatch("ghost/getSinglePage", params.article);
		return { page: page };
	},
	data: function() {
		return {
			color: "var(--color-primary)",
		};
	},
	layout: "loggedoutFullWidth",
	head() {
		return {
			title: this.page.title,
		};
	},
};
</script>
<style lang="scss" scoped>
/deep/ {
	h2 {
		color: var(--color-secondary);
	}
	h3 {
		color: var(--color-secondary);
	}
}
</style>
