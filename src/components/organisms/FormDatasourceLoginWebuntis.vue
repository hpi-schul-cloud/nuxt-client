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
			<template #inputs="{ config }">
				<base-input
					v-model="config.schoolname"
					type="text"
					required="true"
					:label="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.schoolname.label'
						)
					"
					:placeholder="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.schoolname.placeholder'
						)
					"
				>
					<template #icon>
						<base-icon source="material" icon="school" />
					</template>
				</base-input>
				<base-input
					v-model="config.username"
					type="text"
					required="true"
					:label="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.username.label'
						)
					"
					:placeholder="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.username.placeholder'
						)
					"
				>
					<template #icon>
						<base-icon source="custom" icon="user" />
					</template>
				</base-input>
				<base-input
					v-model="config.password"
					type="password"
					required="true"
					:label="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.password.label'
						)
					"
					:placeholder="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.password.placeholder'
						)
					"
					autocomplete="new-password"
				>
					<template #icon>
						<base-icon source="custom" icon="lock" />
					</template>
				</base-input>
				<base-input
					v-model="config.url"
					type="text"
					required="true"
					:label="
						$t('components.organisms.FormDatasourceLoginWebuntis.url.label')
					"
					:placeholder="
						$t(
							'components.organisms.FormDatasourceLoginWebuntis.url.placeholder'
						)
					"
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
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.warning {
	color: var(--color-danger);
}

.icon-margin {
	margin-right: var(--space-xs-2);
	margin-bottom: calc(-0.3 * (var(--space-sm)));
	font-size: var(--text-lg);
}
</style>
