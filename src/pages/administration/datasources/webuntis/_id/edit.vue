<template>
	<base-content-container size="small">
		<base-breadcrumb
			:inputs="[
				{
					text: this.$t('pages.administration.index.title'),
					to: '/administration/',
					icon: { source: 'fa', icon: 'fas fa-cog' },
				},
				{
					text: this.$t('pages.administration.datasources.index.title'),
					to: '/administration/datasources',
				},
				{
					text: this.$t(
						'pages.administration.datasources.webuntis._id.edit.title'
					),
				},
			]"
		/>
		<form-datasource-login-webuntis
			:datasource-id="datasourceId"
			:status="status"
		/>
	</base-content-container>
</template>

<script>
import FormDatasourceLoginWebuntis from "@components/organisms/FormDatasourceLoginWebuntis";

export default {
	components: {
		FormDatasourceLoginWebuntis,
	},
	async asyncData({ store, params, app: { i18n } }) {
		const datasourceId = params.id;
		const datasource = await store.dispatch("datasources/get", datasourceId);
		if (!datasource) {
			throw new Error(
				i18n.t(
					"pages.administration.datasources.webuntis._id.edit.error.unknown_datasource"
				)
			);
		} else if (!datasource?.lastStatus) {
			throw new Error(
				i18n.t(
					"pages.administration.datasources.webuntis._id.edit.error.unknown_status"
				)
			);
		}
		return {
			datasourceId,
			status: datasource.lastStatus,
		};
	},
};
</script>
