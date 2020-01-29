<template>
	<div>
		<user-has-permission permission="DATASOURCES_VIEW">
			<base-breadcrumb :inputs="breadcrumbs" />
			<h1 class="h3">{{$t('pages.administration.datasources.index.title')}}</h1>
			<empty-state :image="imgsrc">
				<template v-slot:description
					>{{$t("pages.administration.datasources.index.emptyText")}}
				</template>
			</empty-state>
			<floating-fab
				position="bottom-right"
				icon="add"
				to="/administration/datasources/add"
				:aria-label="$t('pages.administration.datasources.index.create')"
			/>
		</user-has-permission>
	</div>
</template>

<script>
import BaseBreadcrumb from "@components/base/BaseBreadcrumb";
import EmptyState from "@components/molecules/EmptyState";
import FloatingFab from "@components/molecules/FloatingFab";
import ExampleImage from "@assets/img/emptystate-graph.svg";
import UserHasPermission from "@components/helpers/UserHasPermission";
import { mapGetters } from "vuex";

export default {
	components: {
		BaseBreadcrumb,
		EmptyState,
		FloatingFab,
		UserHasPermission,
	},
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t('pages.administration.index.title'),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t('pages.administration.datasources.index.title'),
					to: "/administration/datasources",
				},
			],
			imgsrc: ExampleImage,
		};
	},
	computed: {
		...mapGetters("datasources", {
			datasources: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("datasources/find");
		},
	},
	head() {
		return {
			title: "Datenquellen",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
