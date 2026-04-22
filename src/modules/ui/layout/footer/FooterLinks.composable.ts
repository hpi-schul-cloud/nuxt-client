import { useEnvConfig } from "@data-env";
import { useFilePaths } from "@data-file";
import { computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";

export type FooterLink = {
	text: string;
	to?: string;
	href?: string;
	target?: string;
};

export type FooterLinksOptions = {
	contactEmail?: string;
	contactSubject: string;
	privacyPolicyKey?: string;
	privacyPolicyAsRoute?: boolean;
	includeSecurityLink?: boolean;
	includeAccessibilityStatement?: boolean;
};

export const useFooterLinks = (options: FooterLinksOptions): { links: ComputedRef<FooterLink[]> } => {
	const { t } = useI18n();
	const { specificFiles } = useFilePaths();
	const env = useEnvConfig();

	const links = computed<FooterLink[]>(() => {
		const contactEmail = options.contactEmail ?? env.value.SC_CONTACT_EMAIL ?? "";

		const baseLinks: FooterLink[] = [
			{
				to: "/imprint",
				text: t("components.legacy.footer.imprint"),
			},
			{
				href: "/termsofuse",
				text: t("components.legacy.footer.terms"),
				target: "_blank",
			},
			options.privacyPolicyAsRoute
				? {
						to: "/privacypolicy",
						text: t(options.privacyPolicyKey ?? "components.legacy.footer.privacy_policy"),
						target: "_blank",
					}
				: {
						href: "/privacypolicy",
						text: t(options.privacyPolicyKey ?? "components.legacy.footer.privacy_policy"),
						target: "_blank",
					},
			{
				href: `mailto:${contactEmail}?subject=${encodeURIComponent(options.contactSubject)}`,
				text: t("components.legacy.footer.contact"),
			},
		];

		if (options.includeSecurityLink) {
			baseLinks.push({
				to: "/system/security",
				text: t("components.legacy.footer.security"),
			});
		}

		if (env.value.ALERT_STATUS_URL) {
			baseLinks.push({
				href: env.value.ALERT_STATUS_URL as string,
				text: t("components.legacy.footer.status"),
				target: "_blank",
			});
		}

		if (env.value.ACCESSIBILITY_REPORT_EMAIL) {
			baseLinks.push({
				href: `mailto:${env.value.ACCESSIBILITY_REPORT_EMAIL}?subject=${t("components.legacy.footer.accessibility.report")}`,
				text: t("components.legacy.footer.accessibility.report"),
				target: "_blank",
			});
		}

		if (options.includeAccessibilityStatement !== false) {
			baseLinks.push({
				href: specificFiles.value.accessibilityStatement,
				text: t("components.legacy.footer.accessibility.statement"),
				target: "_blank",
			});
		}

		return baseLinks;
	});

	return { links };
};
