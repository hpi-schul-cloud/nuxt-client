<template>
	<div>
		<user-has-permission permission="DATASOURCES_VIEW">
			<base-breadcrumb :inputs="inputs" />
			<h3>Datenquellen hinzufügen</h3>
			<datasource-card
				:image="require('@assets/img/logo/logo-webuntis.svg')"
				title="WebUnits"
			>
				<template v-slot:actions>
					<BaseButton design="primary text">
						<BaseIcon source="custom" icon="add-datasource" :fill="color" />
						Datenquelle hinzufügen
					</BaseButton>
				</template>
			</datasource-card>
			<datasource-card
				:image="require('@assets/img/logo/logo-ldap.svg')"
				title="LDAP"
			>
				<template v-slot:actions>
					<BaseButton design="primary text">
						<BaseIcon source="custom" icon="add-datasource" :fill="color" />
						Datenquelle hinzufügen
					</BaseButton>
				</template>
			</datasource-card>
			<datasource-card
				:image="require('@assets/img/logo/logo-rss.svg')"
				title="rss"
			>
				<template v-slot:actions>
					<BaseButton design="primary text">
						<BaseIcon source="custom" icon="add-datasource" :fill="color" />
						Datenquelle hinzufügen
					</BaseButton>
				</template>
			</datasource-card>
		</user-has-permission>
	</div>
</template>

<script>
import BaseBreadcrumb from "@components/base/BaseBreadcrumb";
import ExampleImage from "@assets/img/logo/logo-webuntis.svg";
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
			inputs: [
				{
					text: "Admin",
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: "Systeme",
					href: "http://schul-cloud.org",
				},
				{
					text: "Datenquellen",
					to: "/administration/datasources",
				},
				{
					text: "Hinzufügen",
					to: "/administration/datasources/add",
				},
			],
			imgsrc: ExampleImage,
			color: "var(--color-primary)",
		};
	},
	head() {
		return {
			title: "Datenquellen hinzufügen",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
