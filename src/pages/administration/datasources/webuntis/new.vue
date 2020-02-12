<template>
	<div>
		<base-content-container size="small">
			<base-breadcrumb :inputs="breadcrumbs" />
			<img
				class="mt--xl-4"
				src="@assets/img/datasources/logo-webuntis-text.svg"
			/>
			<h1 class="h5">{{
				$t("pages.administration.datasources.login.heading")
			}}</h1>
			<p v-if="this.$route.query.error" class="mb--xl warning">
				<BaseIcon
					source="custom"
					icon="warning"
					fill="var(--color-danger)"
					class="margin"
				/>{{ $t("pages.administration.datasources.login.error.text") }}</p
			>
			<p v-else class="mb--xl">{{
				$t("pages.administration.datasources.login.text")
			}}</p>

			<form-datasource-login
				type="webuntis"
				autocomplete="off"
				:datasource-id="this.$route.params.id"
			>
				<template v-slot:inputs="{ config }">
					<base-input
						v-model="config.username"
						type="text"
						required="true"
						label="Benutzername"
						:placeholder="'WebUntis Nutzername'"
						class="mt--md"
					>
						<template v-slot:icon>
							<base-icon source="custom" icon="user" />
						</template>
					</base-input>
					<base-input
						v-model="config.password"
						type="password"
						required="true"
						label="Passwort"
						:placeholder="'WebUntis Passwort'"
						class="mt--md"
					>
						<template v-slot:icon>
							<base-icon source="custom" icon="lock" />
						</template>
					</base-input>
					<base-input
						v-model="config.url"
						type="text"
						required="true"
						label="URL"
						:placeholder="'URL der Datenquelle'"
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
			image: "@assets/img/datasources/logo-webuntis-text.svg",
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
					text: this.$t("pages.administration.datasources.login.title"),
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.warning {
	color: var(--color-danger);
}

.margin {
	margin-right: var(--space-xxs);
	margin-bottom: calc(-0.3 * (var(--space-sm)));
	font-size: var(--text-lg);
}
</style>
