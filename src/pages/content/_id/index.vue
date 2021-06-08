<template>
	<lernstore-collection-detail-view v-if="isCollection" :resource="resource" />
	<lernstore-detail-view v-else :resource="resource" />
</template>

<script>
import LernstoreDetailView from "@components/organisms/LernstoreDetailView";
import LernstoreCollectionDetailView from "@components/organisms/LernstoreCollectionDetailView";
import { isCollectionHelper } from "@utils/helpers";
export default {
	meta: {
		requiredPermissions: ["LERNSTORE_VIEW"],
	},
	components: {
		LernstoreDetailView,
		LernstoreCollectionDetailView,
	},
	layout({ store, query }) {
		return String(query.isCollection) === "true" &&
			store.state.content.collectionsFeatureFlag === true
			? "loggedInFull"
			: "plain";
	},
	async asyncData({ store, params }) {
		await store.dispatch("content/getResourceMetadata", params.id);

		const resource = store.getters["content/getCurrentResource"];

		const isCollection =
			store.state.content.collectionsFeatureFlag === true &&
			isCollectionHelper(resource.properties);

		return {
			isCollection,
			id: params.id,
			resource,
		};
	},
};
</script>
