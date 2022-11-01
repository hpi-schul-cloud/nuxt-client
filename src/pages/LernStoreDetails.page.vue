<template>
	<span v-if="status === 'completed'">
		<lernstore-collection-detail-view v-if="isCollection" :resource="resource"/>
		<lernstore-detail-view v-else :id="$route.params.id" :resource="resource"/>
	</span>
	<base-spinner v-else class="spinner" size="xlarge"/>
</template>

<script>
import { contentModule } from "@/store";
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
	layout({ query }) {
		return String(query.isCollection) === "true" &&
			contentModule.getCollectionsFeatureFlag === true
			? "defaultVuetify"
			: "plain";
	},
	computed: {
		resource() {
			return contentModule.getCurrentResource;
		},
		player() {
			return contentModule.getCurrentPlayer;
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
	async mounted() {
		await contentModule.getResourceMetadata(this.$route.params.id);
		console.log(contentModule.getCurrentResource);
		const { mediatype, size } = contentModule.getCurrentResource;
		if (size && mediatype === "file-h5p") {
			await contentModule.getResourcePlayer(this.$route.params.id);
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.spinner {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
</style>
