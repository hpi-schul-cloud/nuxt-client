<template>
	<span>
		<template v-if="status === 'completed'">
			<lernstore-collection-detail-view v-if="isCollection" :resource="resource" />
			<lernstore-detail-view v-else :id="$route.params.id" :resource="resource" />
		</template>
		<div v-else class="d-flex justify-center align-center min-height-screen">
			<v-progress-circular indeterminate size="115" />
		</div>
	</span>
</template>

<script>
import LernstoreCollectionDetailView from "@/components/lern-store/LernstoreCollectionDetailView";
import LernstoreDetailView from "@/components/lern-store/LernstoreDetailView";
import { contentModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";

export default {
	components: {
		LernstoreDetailView,
		LernstoreCollectionDetailView,
	},
	computed: {
		resource() {
			return contentModule.getCurrentResource;
		},
		collectionsFeatureFlag() {
			return contentModule.getCollectionsFeatureFlag;
		},
		status() {
			return contentModule.getStatus;
		},
		isCollection() {
			return contentModule.isCollection;
		},
		isInline() {
			return !!this.$route.query.inline;
		},
		documentTitle() {
			return this.isInline
				? this.$t("pages.content.page.window.title", {
						instance: this.$theme.name,
					})
				: this.$t("common.words.lernstore");
		},
	},
	async created() {
		await contentModule.getResourceMetadata(this.$route.params.id);
		document.title = buildPageTitle(this.documentTitle);
	},
};
</script>

<style lang="scss" scoped>
.min-height-screen {
	min-height: 100vh;
}
</style>
