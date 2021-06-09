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
			store.getters["content/getCollectionsFeatureFlag"] === true
			? "loggedInFull"
			: "plain";
	},
	async asyncData({ store, params }) {
		// TODO wrong use of store
		const resource = await store.dispatch(
			"content/getResourceMetadata",
			params.id
		);

		const isCollection =
			store.getters["content/getCollectionsFeatureFlag"] === true &&
			isCollectionHelper(resource.properties);

		return {
			isCollection,
			id: params.id,
			resource,
		};
	},
};
</script>
