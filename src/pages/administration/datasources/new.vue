<template>
	<div>
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="h3">{{ $t("pages.administration.datasources.new.title") }}</h1>
		<datasource-card
			v-for="provider in datasourceProvider"
			:key="provider.name"
			:image="provider.icon"
			:title="provider.name"
			:subtitle="
				provider.count === 0
					? ''
					: $t(
							'pages.administration.datasources.new.provider.addedDatasources',
							{ number: provider.count }
					  )
			"
			class="mb--md"
		>
			<template v-slot:actions>
				<responsive-icon-button
					design="primary text"
					source="material"
					icon="add"
					@click="forwardCreate(provider.name.toLowerCase())"
				>
					{{ $t("pages.administration.datasources.new.add") }}
				</responsive-icon-button>
			</template>
		</datasource-card>
	</div>
</template>

<script>
import DatasourceCard from "@components/molecules/DatasourceCard";
import ResponsiveIconButton from "@components/molecules/ResponsiveIconButton";

export default {
	components: {
		DatasourceCard,
		ResponsiveIconButton,
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
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.datasources.index.title"),
					to: "/administration/datasources",
				},
				{
					text: this.$t("pages.administration.datasources.new.title"),
					to: "/administration/datasources/new",
				},
			],
			datasourceProvider: [
				{
					name: this.$t(
						"pages.administration.datasources.new.provider.WebUntis.name"
					),
					icon: require("@assets/img/datasources/logo-webuntis.png"),
					count: 0,
				},
				{
					name: this.$t(
						"pages.administration.datasources.new.provider.LDAP.name"
					),
					icon: require("@assets/img/datasources/logo-ldap.svg"),
					count: 0,
				},
				{
					name: this.$t(
						"pages.administration.datasources.new.provider.RSS.name"
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
			title: this.$t("pages.administration.datasources.new.title"),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
