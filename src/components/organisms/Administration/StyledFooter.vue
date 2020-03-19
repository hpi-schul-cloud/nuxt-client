<template>
	<div class="section">
		<strong>{{ $t("pages.administration.students.footer.title") }}</strong>
		<div class="consent-icon">
			<span>
				<base-icon
					source="material"
					icon="check"
					color="var(--color-success)"
				/>
				{{ $t("pages.administration.students.footer.icon.success") }}
			</span>
			<span>
				<base-icon
					source="material"
					icon="check"
					color="var(--color-warning)"
				/>
				{{ $t("pages.administration.students.footer.icon.warning") }}
			</span>
			<span>
				<base-icon source="material" icon="clear" color="var(--color-danger)" />
				{{ $t("pages.administration.students.footer.icon.danger") }}
			</span>
		</div>
		<span class="container">
			<img
				class="ldap-logo"
				src="@assets/img/datasources/logo-ldap.svg"
				alt="LDAP Logo"
			/>
			<strong>
				{{ $t("pages.administration.students.footer.ldap") }}
				<base-link
					class="link-style"
					to="/administration/helpdesk"
					:no-styles="true"
					traget="_blank"
				>
					{{ $t("pages.administration.students.footer.help") }}.
				</base-link>
			</strong>
		</span>
		<p class="hint">
			{{ $t("pages.administration.students.footer.hint") }}
		</p>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: "var(--color-primary)",
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
