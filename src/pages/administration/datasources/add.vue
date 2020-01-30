<template>
	<div>
		<user-has-permission permission="DATASOURCES_VIEW">
			<base-breadcrumb :inputs="breadcrumbs" />
			<h3>{{ $t("pages.administration.datasources.add.title") }}</h3>
			<datasource-card
				:image="require('@assets/img/datasources/logo-webuntis.png')"
				title="WebUnits"
			>
				<template v-slot:actions>
					<BaseButton design="primary text">
						<BaseIcon source="custom" icon="add-datasource" :fill="color" />
						{{ $t("pages.administration.datasources.add.btnAdd") }}
					</BaseButton>
				</template>
			</datasource-card>
			<datasource-card
				:image="require('@assets/img/datasources/logo-ldap.svg')"
				title="LDAP"
			>
				<template v-slot:actions>
					<BaseButton design="primary text">
						<BaseIcon source="custom" icon="add-datasource" :fill="color" />
						{{ $t("pages.administration.datasources.add.btnAdd") }}
					</BaseButton>
				</template>
			</datasource-card>
			<datasource-card
				:image="require('@assets/img/datasources/logo-rss.png')"
				title="rss"
			>
				<template v-slot:actions>
					<BaseButton design="primary text">
						<BaseIcon source="custom" icon="add-datasource" :fill="color" />
						{{ $t("pages.administration.datasources.add.btnAdd") }}
					</BaseButton>
				</template>
			</datasource-card>
		</user-has-permission>
	</div>
</template>

<script>
import BaseBreadcrumb from "@components/base/BaseBreadcrumb";
import ExampleImage from "@assets/img/datasources/logo-webuntis.png";
import DatasourceCard from "@components/molecules/DatasourceCard";
import UserHasPermission from "@components/helpers/UserHasPermission";

export default {
	components: {
		BaseBreadcrumb,
		DatasourceCard,
		UserHasPermission,
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
			imgsrc: ExampleImage,
			color: "var(--color-primary)",
		};
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
