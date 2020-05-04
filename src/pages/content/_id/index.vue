<!-- eslint-disable max-lines -->

<template>
	<div class="content">
		<lernstore-detail-view :resource="resource" />
	</div>
</template>

<script>
import LernstoreDetailView from "@components/organisms/LernstoreDetailView";

export default {
	components: {
		LernstoreDetailView,
	},
	layout: "fullScreenLernstore",
	async asyncData({ store, params }) {
		const resource = await store.dispatch(
			"content/getResourceMetadata",
			params.id
		);

		return {
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
