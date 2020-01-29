<template>
	<div>
		<base-breadcrumb :inputs="breadcrumbs" />
		<base-content-container size="small">
			<img
				class="mt--xl-4"
				src="@assets/img/datasources/logo-webuntis-text.svg"
			/>
			<h1 class="h5">{{
				$t("pages.administration.datasources.login.heading")
			}}</h1>
			<p class="mt--md">{{
				$t("pages.administration.datasources.login.text")
			}}</p>

			<form-datasource-login type="webuntis">
				<template v-slot:inputs="{ config }">
					<base-input
						v-model="config.username"
						type="text"
						label="Benutzername"
						:placeholder="'WebUntis Nutzername'"
						class="mt--md"
					/>
					<base-input
						v-model="config.password"
						type="password"
						label="Passwort"
						:placeholder="'WebUntis Passwort'"
						class="mt--md"
					/>
					<base-input
						v-model="config.url"
						type="text"
						label="URL"
						:placeholder="'erato.webuntis.com'"
						class="mt--md"
					/>
				</template>
			</form-datasource-login>
		</base-content-container>
	</div>
</template>
<script>
import FormDatasourceLogin from "@components/organisms/FormDatasourceLogin";
import BaseContentContainer from "@components/base/BaseContentContainer";

export default {
	components: {
		FormDatasourceLogin,
		BaseContentContainer,
	},
	data() {
		return {
			image: "@assets/img/logo/logo-webuntis-text.svg",
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
				{
					text: this.$t("pages.administration.datasources.login.title"),
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.h5 {
	text-align: center;
}
</style>
