<template>
	<div>
		<img
			class="mt--xl-4"
			alt="WebUntis Logo"
			src="@assets/img/datasources/logo-webuntis-text.svg"
		/>
		<p v-if="status === 'Error' && datasourceId" class="mb--xl warning">
			<BaseIcon
				source="custom"
				icon="warning"
				fill="var(--color-danger)"
				class="icon-margin"
			/>
			{{ $t("components.organisms.FormDatasourceLoginWebuntis.error.text") }}
		</p>
		<p v-else class="mb--xl">
			{{ $t("pages.administration.datasources.webuntis.new.text") }}
		</p>

		<form-datasource-login type="webuntis" :datasource-id="datasourceId">
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
					autocomplete="new-password"
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
	</div>
</template>

<script>
import FormDatasourceLogin from "@components/organisms/FormDatasourceLogin";

export default {
	components: {
		FormDatasourceLogin,
	},
	props: {
		datasourceId: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			default: "success",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.warning {
	color: var(--color-danger);
}

.icon-margin {
	margin-right: var(--space-xxs);
	margin-bottom: calc(-0.3 * (var(--space-sm)));
	font-size: var(--text-lg);
}
</style>
