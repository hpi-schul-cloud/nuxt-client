import { useFooterLinks } from "./footer-links.composable";
import { createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("useFooterLinks", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (theme: SchulcloudTheme = SchulcloudTheme.BRB, envOverrides?: Record<string, unknown>) => {
		createTestEnvStore({
			DOCUMENT_BASE_DIR: "https://dbildungscloud.de/documents/",
			SC_THEME: theme,
			SC_TITLE: "Test Cloud",
			SC_CONTACT_EMAIL: "default@dbildungscloud.de",
			...envOverrides,
		});

		return mountComposable(() => useFooterLinks(), {
			global: {
				plugins: [createTestingI18n()],
			},
		});
	};

	it("should return footer links with imprint, terms, privacy and contact", () => {
		const { links } = setup(SchulcloudTheme.BRB);

		expect(links.value[0].to).toBe("/imprint");
		expect(links.value[1].href).toBe("/termsofuse");
		expect(links.value[2].href).toBe("/privacypolicy");
		expect(links.value[3].href).toContain("mailto:default@dbildungscloud.de");
		expect(links.value[3].href).toContain("Test%20Cloud%20Anfrage");
	});

	it("should use custom privacy policy key for THR theme", () => {
		const { links } = setup(SchulcloudTheme.THR);

		expect(links.value[2].text).toBe("components.legacy.footer.privacy_policy_thr");
	});

	it("should use router link for privacy policy for DEFAULT theme", () => {
		const { links } = setup(SchulcloudTheme.DEFAULT);

		expect(links.value[2].to).toBe("/privacypolicy");
		expect(links.value[2].href).toBeUndefined();
	});

	it("should use href for privacy policy for BRB theme", () => {
		const { links } = setup(SchulcloudTheme.BRB);

		expect(links.value[2].href).toBe("/privacypolicy");
		expect(links.value[2].to).toBeUndefined();
	});

	it("should include security link for DEFAULT theme", () => {
		const { links } = setup(SchulcloudTheme.DEFAULT);

		const securityLink = links.value.find((link) => link.to === "/system/security");
		expect(securityLink).toBeDefined();
	});

	it("should not include security link for BRB theme", () => {
		const { links } = setup(SchulcloudTheme.BRB);

		const securityLink = links.value.find((link) => link.to === "/system/security");
		expect(securityLink).toBeUndefined();
	});

	it("should include status link when ALERT_STATUS_URL is set", () => {
		const { links } = setup(SchulcloudTheme.DEFAULT, {
			ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		});

		const statusLink = links.value.find((link) => link.href === "https://status.dbildungscloud.de");
		expect(statusLink).toBeDefined();
	});

	it("should include accessibility report link", () => {
		const { links } = setup(SchulcloudTheme.BRB, {
			ACCESSIBILITY_REPORT_EMAIL: "a11y@dbildungscloud.de",
		});

		const a11yReportLink = links.value.find((link) => link.href?.includes("a11y@dbildungscloud.de"));
		expect(a11yReportLink).toBeDefined();
	});

	it("should include accessibility statement link for BRB theme", () => {
		const { links } = setup(SchulcloudTheme.BRB);

		const a11yStatementLink = links.value.find((link) => link.href?.includes("Barrierefreiheitserklaerung.pdf"));
		expect(a11yStatementLink).toBeDefined();
	});

	it("should not include accessibility statement link for DEFAULT theme", () => {
		const { links } = setup(SchulcloudTheme.DEFAULT);

		const a11yStatementLink = links.value.find((link) => link.href?.includes("Barrierefreiheitserklaerung.pdf"));
		expect(a11yStatementLink).toBeUndefined();
	});
});
