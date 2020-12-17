<template>
	<div class="content">
		<lernstore-collection-detail-view
			v-if="isCollection"
			:resource="resource"
		/>
		<lernstore-detail-view v-else :resource="resource" />
	</div>
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
		return String(query.isCollection) == "true" ? "loggedInFull" : "plain";
	},
	async asyncData({ store, params }) {
		const resource = await store.dispatch(
			"content/getResourceMetadata",
			params.id
		);

		const isCollection = isCollectionHelper(resource.properties);

		return {
			isCollection,
			id: params.id,
			resource,
		};
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
