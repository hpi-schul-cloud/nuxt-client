import { useFooterLinks } from "./FooterLinks.composable";
import { createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("useFooterLinks", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			DOCUMENT_BASE_DIR: "https://dbildungscloud.de/documents/",
			SC_THEME: SchulcloudTheme.DEFAULT,
		});
	});

	const setup = (options: Parameters<typeof useFooterLinks>[0]) =>
		mountComposable(() => useFooterLinks(options), {
			global: {
				plugins: [createTestingI18n()],
			},
		});

	it("should return footer links with imprint, terms, privacy and contact", () => {
		const { links } = setup({
			contactEmail: "test@example.com",
			contactSubject: "Test Subject",
		});

		expect(links.value).toHaveLength(5);
		expect(links.value[0].to).toBe("/imprint");
		expect(links.value[1].href).toBe("/termsofuse");
		expect(links.value[2].href).toBe("/privacypolicy");
		expect(links.value[3].href).toContain("mailto:test@example.com");
		expect(links.value[3].href).toContain("Test%20Subject");
	});

	it("should use SC_CONTACT_EMAIL from env when contactEmail is not provided", () => {
		createTestEnvStore({
			DOCUMENT_BASE_DIR: "https://dbildungscloud.de/documents/",
			SC_THEME: SchulcloudTheme.DEFAULT,
			SC_CONTACT_EMAIL: "env@dbildungscloud.de",
		});

		const { links } = setup({
			contactSubject: "Test Subject",
		});

		expect(links.value[3].href).toContain("mailto:env@dbildungscloud.de");
	});

	it("should use custom privacy policy key", () => {
		const { links } = setup({
			contactEmail: "test@example.com",
			contactSubject: "Test Subject",
			privacyPolicyKey: "components.legacy.footer.privacy_policy_thr",
		});

		expect(links.value[2].text).toBe("components.legacy.footer.privacy_policy_thr");
	});

	it("should use router link for privacy policy", () => {
		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
			privacyPolicyAsRoute: true,
		});

		expect(links.value[2].to).toBe("/privacypolicy");
		expect(links.value[2].href).toBeUndefined();
	});

	it("should use href for privacy policy", () => {
		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
			privacyPolicyAsRoute: false,
		});

		expect(links.value[2].href).toBe("/privacypolicy");
		expect(links.value[2].to).toBeUndefined();
	});

	it("should include security link", () => {
		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
			includeSecurityLink: true,
		});

		const securityLink = links.value.find((link) => link.to === "/system/security");
		expect(securityLink).toBeDefined();
	});

	it("should not include security link by default", () => {
		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
		});

		const securityLink = links.value.find((link) => link.to === "/system/security");
		expect(securityLink).toBeUndefined();
	});

	it("should include status link when ALERT_STATUS_URL is set", () => {
		createTestEnvStore({
			DOCUMENT_BASE_DIR: "https://dbildungscloud.de/documents/",
			SC_THEME: SchulcloudTheme.DEFAULT,
			ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		});

		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
		});

		const statusLink = links.value.find((link) => link.href === "https://status.dbildungscloud.de");
		expect(statusLink).toBeDefined();
	});

	it("should include accessibility report link", () => {
		createTestEnvStore({
			DOCUMENT_BASE_DIR: "https://dbildungscloud.de/documents/",
			SC_THEME: SchulcloudTheme.DEFAULT,
			ACCESSIBILITY_REPORT_EMAIL: "a11y@dbildungscloud.de",
		});

		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
		});

		const a11yReportLink = links.value.find((link) => link.href?.includes("a11y@dbildungscloud.de"));
		expect(a11yReportLink).toBeDefined();
	});

	it("should include accessibility statement link by default", () => {
		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
		});

		const lastLink = links.value[links.value.length - 1];
		expect(lastLink.href).toContain("Barrierefreiheitserklaerung.pdf");
	});

	it("should not include accessibility statement link", () => {
		const { links } = setup({
			contactEmail: "test@dbildungscloud.de",
			contactSubject: "Test Subject",
			includeAccessibilityStatement: false,
		});

		const a11yStatementLink = links.value.find((link) => link.href?.includes("Barrierefreiheitserklaerung.pdf"));
		expect(a11yStatementLink).toBeUndefined();
	});
});
