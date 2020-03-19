<template>
	<div class="section">
		<strong>{{ $t("components.molecules.adminfooterlegend.title") }}</strong>
		<div class="consent-icon">
			<li v-for="icon in icons" :key="icon.icon">
				<span>
					<base-icon source="material" :icon="icon.icon" :color="icon.color" />
					{{ icon.i18n }}
				</span>
			</li>
		</div>
		<span v-if="showLdapHint" class="container">
			<img
				class="ldap-logo"
				src="@assets/img/datasources/logo-ldap.svg"
				alt="LDAP Logo"
			/>
			<strong>
				{{ $t("components.molecules.admintablelegend.ldap") }}
				<base-link
					class="link-style"
					to="/administration/helpdesk"
					:no-styles="true"
					traget="_blank"
				>
					{{ $t("components.molecules.admintablelegend.help") }}.
				</base-link>
			</strong>
		</span>
		<p class="hint">
			{{ $t("components.molecules.admintablelegend.hint") }}
		</p>
	</div>
</template>

<script>
export default {
	props: {
		icons: {
			type: Array,
			required: true,
		},
		showLdapHint: {
			type: Boolean,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.section {
	margin-top: var(--space-lg);
}

.consent-icon {
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: left;
	margin-top: var(--space-sm);
	margin-bottom: var(--space-xl);

	> li {
		list-style: none;
	}
}

.ldap-logo {
	width: 3rem;
	margin-right: var(--space-md);
}

.container {
	display: flex;
	justify-content: left;
}

.hint {
	margin-top: var(--space-lg);
	color: var(--color-gray);
}

.link-style {
	color: var(--color-black);
	text-decoration: underline;
}
</style>
