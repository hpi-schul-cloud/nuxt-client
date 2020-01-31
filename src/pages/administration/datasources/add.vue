<template>
	<div>
		<user-has-permission permission="DATASOURCES_VIEW">
			<base-breadcrumb :inputs="breadcrumbs" />
			<h1 class="h3">
				{{ $t("pages.administration.datasources.add.title") }}</h1
			>
			<datasource-card
				v-for="provider in datasourceProvider"
				:key="provider.name"
				:image="provider.icon"
				:title="provider.name"
				:subtitle="
					provider.count === 0
						? ''
						: $t(
								'pages.administration.datasources.add.provider.addedDatasources',
								{ x: provider.count }
						  )
				"
				class="mb--md"
			>
				<template v-slot:actions>
					<BaseButton
						design="primary text"
						@click="forwardCreate(provider.name.toLowerCase())"
					>
						<BaseIcon source="custom" icon="datasource-add" />
						{{ $t("pages.administration.datasources.add.btnAdd") }}
					</BaseButton>
				</template>
			</datasource-card>
		</user-has-permission>
	</div>
</template>

<script>
import BaseBreadcrumb from "@components/base/BaseBreadcrumb";
import DatasourceCard from "@components/molecules/DatasourceCard";
import UserHasPermission from "@components/helpers/UserHasPermission";

export default {
	components: {
		BaseBreadcrumb,
		DatasourceCard,
		UserHasPermission,
	},
	meta: {
		requiredPermissions: ["DATASOURCES_VIEW"],
	},
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t("pages.administration.datasources.index.title"),
					to: "/administration/datasources",
				},
				{
					text: this.$t("pages.administration.datasources.add.title"),
					to: "/administration/datasources/add",
				},
			],
			datasourceProvider: [
				{
					name: this.$t(
						"pages.administration.datasources.add.provider.WebUntis.name"
					),
					icon: require("@assets/img/datasources/logo-webuntis.png"),
					count: 0,
				},
				{
					name: this.$t(
						"pages.administration.datasources.add.provider.LDAP.name"
					),
					icon: require("@assets/img/datasources/logo-ldap.svg"),
					count: 0,
				},
				{
					name: this.$t(
						"pages.administration.datasources.add.provider.RSS.name"
					),
					icon: require("@assets/img/datasources/logo-rss.svg"),
					count: 0,
				},
			],
		};
	},
	created() {
		this.datasourceProvider.map((source) => {
			this.getAddedSourcesCount(source);
		});
	},
	methods: {
		async getAddedSourcesCount(source) {
			await this.$store
				.dispatch("datasources/find", {
					query: {
						$limit: 0,
						config: {
							target: source.name.toLowerCase(),
						},
					},
				})
				.then((res) => {
					source.count = res.total;
				})
				.catch((err) => {
					console.error(err);
				});
		},
		forwardCreate(name) {
			this.$router.push({
				path: "/administration/datasources/" + name + "/new",
			});
		},
	},
	head() {
		return {
			title: this.$t("pages.administration.datasources.add.title"),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
