<template>
	<footer class="footer">
		<div class="top-line">
			<span class="current-year">© {{ currentYear }} {{ $theme.name }}</span>
		</div>

		<div>
			<template v-for="(link, index) in links">
				<span v-if="index !== 0" :key="index"> - </span>
				<template v-if="!link.innerlinks">
					<base-link :key="link.text" class="footer-link" v-bind="link">{{
						link.text
					}}</base-link>
				</template>
				<template v-else>
					<span
						:key="link.text"
						:aria-label="
							$t('components.legacy.footer.ariaLabel', {
								itemName: link.text,
							})
						"
						>{{ link.text }}</span
					>
				</template>
			</template>
		</div>
	</footer>
</template>

<script>
import { authModule, filePathsModule, envConfigModule } from "@/store";

export default {
	computed: {
		school() {
			return authModule.getSchool;
		},
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			const links = [
				{
					to: "/imprint",
					text: this.$t("components.legacy.footer.imprint"),
				},
				{
					href: "/termsofuse",
					text: this.$t("components.legacy.footer.terms"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "/privacypolicy",
					text: this.$t("components.legacy.footer.privacy_policy"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "mailto:schul-cloud@bildungsserver.berlin-brandenburg.de?subject=Schul-Cloud%20Brandenburg%20Anfrage",
					text: this.$t("components.legacy.footer.contact"),
				},
				{
					href: "https://github.com/hpi-schul-cloud",
					text: this.$t("components.legacy.footer.github"),
				},
			];
			if (envConfigModule.getEnv.ALERT_STATUS_URL) {
				links.push({
					href: envConfigModule.getEnv.ALERT_STATUS_URL,
					text: this.$t("components.legacy.footer.status"),
					target: "_blank",
					rel: "noopener",
				});
			}
			if (envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL) {
				links.push({
					href:
						"mailto:" +
						envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL +
						"?subject=" +
						this.$t("components.legacy.footer.accessibility.report"),
					text: this.$t("components.legacy.footer.accessibility.report"),
					target: "_blank",
					rel: "noopener",
				});
			}
			links.push({
				href: filePathsModule.getSpecificFiles.accessibilityStatement,
				text: this.$t("components.legacy.footer.accessibility.statement"),
				target: "_blank",
				rel: "noopener",
			});
			return links;
		},
	},
};
</script>

<style lang="scss" scoped>
.current-year {
	margin-bottom: var(--space-xs);
	font-size: var(--text-lg);
}

.footer {
	width: 100%;
	padding: 0 var(--space-md);
	margin: var(--space-lg) 0 var(--space-md);
	color: rgba(var(--v-theme-secondary-darken-1));
	text-align: center;
}

.top-line {
	display: flex;
	align-items: center;
	justify-content: center;
}

.footer-link {
	color: rgba(var(--v-theme-primary));
	border: none;

	&:focus,
	&:hover {
		color: rgba(var(--v-theme-primary-darken-1));
		text-decoration: underline;
	}

	&:visited {
		color: rgba(var(--v-theme-primary));
	}
}
</style>
