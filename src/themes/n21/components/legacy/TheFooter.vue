<template>
	<footer class="footer">
		<div class="top-line">
			<span class="current-year">© {{ currentYear }} </span>
		</div>

		<div>
			<template v-for="(link, index) in links">
				<span v-if="index !== 0" :key="index"> - </span>
				<template v-if="!link.innerlinks">
					<base-link
						:key="link.text"
						class="footer-link"
						v-bind="link"
						:aria-label="
							$t('components.legacy.footer.ariaLabel', {
								itemName: link.text,
							})
						"
						>{{ link.text }}</base-link
					>
				</template>
				<template v-else>
					<span
						:key="link.text"
						:aria-label="
							$t('components.legacy.footer.ariaLabel', {
								itemName: link.text,
							})
						"
						>{{ link.text }}
					</span>
				</template>
			</template>
		</div>
	</footer>
</template>

<script>
import { authModule, envConfigModule, filePathsModule } from "@/store";

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
					href: filePathsModule.getSpecificFiles.termsOfUseSchool,
					text: this.$t("components.legacy.footer.terms"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "/datenschutz",
					text: this.$t("components.legacy.footer.privacy_policy"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "mailto:nbc-support@netz-21.de?subject=Niedersächsische%20Bildungscloud%20Anfrage",
					text: this.$t("components.legacy.footer.contact"),
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
	color: var(--color-secondary-dark);
	text-align: center;
}
.top-line {
	display: flex;
	align-items: center;
	justify-content: center;
}
.footer-link {
	color: var(--color-primary);
	border: none;
	&:focus,
	&:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}
	&:visited {
		color: var(--color-primary);
	}
}
</style>
