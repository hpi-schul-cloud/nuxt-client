<template>
	<span>
		<span v-if="status === 'completed'">
			<lernstore-collection-detail-view
				v-if="isCollection"
				:resource="resource"
			/>
			<lernstore-detail-view v-else :resource="resource" />
		</span>
		<base-spinner v-else />
	</span>
</template>

<script>
import ContentModule from "@/store/content";
import LernstoreDetailView from "@components/organisms/LernstoreDetailView";
import LernstoreCollectionDetailView from "@components/organisms/LernstoreCollectionDetailView";
import BaseSpinner from "@components/base/BaseSpinner";

export default {
	meta: {
		requiredPermissions: ["LERNSTORE_VIEW"],
	},
	components: {
		LernstoreDetailView,
		LernstoreCollectionDetailView,
		BaseSpinner,
	},
	layout({ store, query }) {
		return String(query.isCollection) === "true" &&
			store.getters["content/getCollectionsFeatureFlag"] === true
			? "loggedInFull"
			: "plain";
	},
	computed: {
		resource() {
			return ContentModule.getCurrentResource;
		},
		collectionsFeatureFlag() {
			return ContentModule.collectionsFeatureFlag;
		},
		status() {
			return ContentModule.getStatus;
		},
		isCollection() {
			return ContentModule.isCollection;
		},
	},
	async created() {
		await ContentModule.getResourceMetadata(this.$route.params.id);
	},
};
</script>
