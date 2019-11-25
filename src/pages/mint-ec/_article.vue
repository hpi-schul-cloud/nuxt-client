<template>
	<div>
		<page-header :image="page.feature_image"></page-header>

		<h1>{{ page.title }}</h1>
		<render-html :html="page.html" />
	</div>
</template>

<script>
import PageHeader from "@components/molecules/Ghost/PageHeader";
import RenderHtml from "@components/helpers/RenderHtml";
export default {
	components: {
		PageHeader,
		RenderHtml,
	},
	async asyncData({ store, params }) {
		const page = await store.dispatch("ghost/getSinglePage", params.article);
		return { page: page };
	},
	layout: "loggedout",
	head() {
		return {
			title: this.page.title,
		};
	},
};
</script>
<style lang="scss" scoped>
h1 {
	color: var(--color-secondary);
}
</style>
