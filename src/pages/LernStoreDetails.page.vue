<template>
	<span v-if="status === 'completed'">
		<lernstore-collection-detail-view
			v-if="isCollection"
			:resource="resource"
			:renderer="renderer"
		/>
		<lernstore-detail-view v-else :resource="resource" :renderer="renderer" />
	</span>
	<base-spinner v-else />
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
		renderer() {
			return contentModule.getCurrentRenderer;
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
		const { mediatype } = contentModule.getCurrentResource;
		const { size } = contentModule.getCurrentResource;
		//TODO: Delete (only for testing)
		//mediatype == "file-h5p";
		//size = 1;
		if (
			mediatype == "file-h5p" &&
			size > 0 &&
			size != null &&
			size != undefined
		) {
			await contentModule.getResourceRenderer(this.$route.params.id);
		}
	},
};
</script>

<style lang="scss" scoped>
base-spinner {
	position: absolute;
	top: 45%;
	left: 45%;
	width: 10%;
	height: 10%;
}
</style>
