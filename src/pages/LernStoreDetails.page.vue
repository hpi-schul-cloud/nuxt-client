<template>
	<span>
		<template v-if="status === 'completed'">
			<lernstore-collection-detail-view v-if="true" :resource="resource" />
			<lernstore-detail-view v-else :resource="resource" />
		</template>
		<div v-else class="d-flex justify-center align-center min-height-screen">
			<v-progress-circular indeterminate color="secondary" size="115" />
		</div>
	</span>
</template>

<script>
import { contentModule } from "@/store";
import LernstoreDetailView from "@components/organisms/LernstoreDetailView";
import LernstoreCollectionDetailView from "@components/organisms/LernstoreCollectionDetailView";

export default {
	meta: {
		requiredPermissions: ["LERNSTORE_VIEW"],
	},
	components: {
		LernstoreDetailView,
		LernstoreCollectionDetailView,
	},
	layout({ query }) {
		return String(query.isCollection) === "true" &&
			contentModule.getCollectionsFeatureFlag === true
			? "default"
			: "plain";
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
	},
	async created() {
		await contentModule.getResourceMetadata(this.$route.params.id);
	},
};
</script>

<style lang="scss" scoped>
.min-height-screen {
	min-height: 100vh;
}
</style>
