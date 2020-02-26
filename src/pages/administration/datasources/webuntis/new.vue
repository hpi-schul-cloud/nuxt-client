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
					text: this.$t('pages.administration.datasources.webuntis.new.title'),
				},
			]"
		/>

		<form-datasource-login-webuntis />
	</base-content-container>
</template>
<script>
import FormDatasourceLoginWebuntis from "@components/organisms/FormDatasourceLoginWebuntis";

export default {
	components: {
		FormDatasourceLoginWebuntis,
	},
};
</script>
