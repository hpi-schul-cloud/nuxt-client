<template>
	<div>
		<base-breadcrumb :inputs="breadcrumb" />
		<h3>{{ $t("pages.administration.datasources.index.title") }}</h3>

		<empty-state :image="imgsrc">
			<template v-slot:description>
				{{ $t("pages.administration.datasources.index.empty") }}
			</template>
		</empty-state>

		<floating-fab
			:position="position"
			:icon="icon"
			to="/administration/datasources/new"
		/>
	</div>
</template>

<script>
import EmptyState from "@components/molecules/EmptyState";
import FloatingFab from "@components/molecules/FloatingFab";
import ImageEmptyState from "@assets/img/emptystate-graph.svg";

export default {
	components: {
		EmptyState,
		FloatingFab,
	},
	meta: {
		requiredPermissions: ["DATASOURCES_VIEW"],
	},
	data() {
		return {
			breadcrumb: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t("pages.administration.datasources.index.title"),
				},
			],
			imgsrc: ImageEmptyState,
		};
	},
	head() {
		return {
			title: this.$t("pages.administration.datasources.index.title"),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.datasources {
	list-style: none;
}
</style>
