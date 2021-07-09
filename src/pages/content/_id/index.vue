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
import LernstoreDetailView from "@components/organisms/LernstoreDetailView";
import LernstoreCollectionDetailView from "@components/organisms/LernstoreCollectionDetailView";
import BaseSpinner from "@components/base/BaseSpinner";
import { mapGetters } from "vuex";

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
		...mapGetters("content", {
			resource: "getCurrentResource",
			collectionsFeatureFlag: "getCollectionsFeatureFlag",
			status: "getStatus",
			isCollection: "isCollection",
		}),
	},
	async created() {
		await this.$store.dispatch(
			"content/getResourceMetadata",
			this.$route.params.id
		);
	},
};
</script>
