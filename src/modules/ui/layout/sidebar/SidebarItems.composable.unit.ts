import { useSidebarItems } from "./SidebarItems.composable";
import { createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { ConfigResponse, SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

const setup = (envs?: Partial<ConfigResponse>, theme = SchulcloudTheme.BRB) => {
	setActivePinia(createTestingPinia());
	createTestEnvStore({
		ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		ACCESSIBILITY_REPORT_EMAIL: "email",
		TRAINING_URL: "https://lernen.dbildungscloud.de",
		FEATURE_MEDIA_SHELF_ENABLED: true,
		SC_THEME: theme,
		DOCUMENT_BASE_DIR: "https://example.com/documents/",
		...envs,
	});

	return mountComposable(() => useSidebarItems(), {
		global: {
			plugins: [createTestingI18n()],
		},
	});
};

describe("SidebarItems Composable", () => {
	it("should have correct amount of page links", () => {
		const { pageLinks } = setup();

		expect(pageLinks.value).toHaveLength(8);
	});

	it("should have correct amount of page links", () => {
		const { pageLinks } = setup();

		expect(pageLinks.value).toHaveLength(8);
		expect(pageLinks.value[1].permissions).toBeUndefined();

		const roomsLink = pageLinks.value.find((link) => link.title === "global.sidebar.item.rooms");

		expect(roomsLink?.permissions).toBeUndefined();
	});

	it("should have correct amount of legal links", () => {
		const { legalLinks } = setup();

		expect(legalLinks.value).toHaveLength(6);
	});

	it("should have correct amount of meta links", () => {
		const { metaLinks } = setup();

		expect(metaLinks.value).toHaveLength(3);
	});

	it("should keep independent administration links without Teams", () => {
		const { metaLinks } = setup();
		const management = metaLinks.value.find((link) => link.testId === "sidebar-management");

		expect(management?.children.map((link) => link.testId)).toEqual([
			"sidebar-management-students",
			"sidebar-management-teachers",
			"sidebar-room-management",
			"sidebar-management-courses",
			"sidebar-management-classes",
			"sidebar-management-school",
		]);
		expect(management?.children.some((link) => link.href === "/administration/teams")).toBe(false);
	});
});
