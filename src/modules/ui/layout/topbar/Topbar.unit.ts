import Topbar from "./Topbar.vue";
import { RoleName, SchulcloudTheme } from "@/serverApi/v3";
import { createTestAppStore, createTestEnvStore } from "@@/tests/test-utils";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useStatusAlerts } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, h, ref } from "vue";
import { VApp } from "vuetify/lib/components/index";

vi.mock("@data-app/status-alerts.composable");
const mockedUseStatusAlerts = vi.mocked(useStatusAlerts);

describe("@ui-layout/Topbar", () => {
	mockedUseStatusAlerts.mockReturnValue({
		businessError: ref({ statusCode: "", message: "" }),
		status: ref(""),
		statusAlerts: ref(mockStatusAlerts),
		getStatusAlerts: computed(() => mockStatusAlerts),
		fetchStatusAlerts: vi.fn(),
		setBusinessError: vi.fn(),
		resetBusinessError: vi.fn(),
		setStatus: vi.fn(),
		setStatusAlerts: vi.fn(),
	});

	const setup = (windowWidth = 1300, isSidebarExpanded?: boolean) => {
		setActivePinia(createTestingPinia());
		createTestAppStore({
			me: {
				school: {
					id: "234",
					name: "School",
					logo: {
						url: "url",
					},
				},
				user: {
					id: "123",
					firstName: "Arthur",
					lastName: "Dent",
				},
				roles: [
					{
						id: RoleName.Administrator,
						name: RoleName.Administrator,
					},
				],
			},
		});

		createTestEnvStore({
			SC_THEME: SchulcloudTheme.Brb,
		});

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const wrapper = mount(VApp, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				default: h(Topbar, {
					sidebarExpanded: isSidebarExpanded ?? true,
				}),
			},
		});

		const topbar = wrapper.findComponent({ name: "Topbar" });
		return { wrapper, topbar };
	};

	it("should render component", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("when sidebar is expanded", () => {
		it("should not show toggle button", () => {
			const { wrapper } = setup();

			const sidebarToggle = wrapper.findComponent({ name: "VAppBarNavIcon" });

			expect(sidebarToggle.exists()).toEqual(false);
		});

		it("should not show logo", () => {
			const { wrapper } = setup();

			const topbarLogo = wrapper.findComponent({ name: "TopbarLogo" });

			expect(topbarLogo.exists()).toEqual(false);
		});
	});

	describe("when sidebar is collapsed", () => {
		it("should show toggle button", () => {
			const { wrapper } = setup(1300, false);

			const sidebarToggle = wrapper.findComponent({ name: "VAppBarNavIcon" });

			expect(sidebarToggle.exists()).toEqual(true);
		});

		it("should show logo", () => {
			const { wrapper } = setup(1300, false);

			const topbarLogo = wrapper.findComponent({ name: "CloudLogo" });

			expect(topbarLogo.exists()).toEqual(true);
		});

		it("should emit sidebar-toggled", async () => {
			const { wrapper, topbar } = setup(1300, false);

			const sidebarToggle = wrapper.findComponent({ name: "VAppBarNavIcon" });
			await sidebarToggle.trigger("click");

			expect(topbar.emitted("sidebar-toggled")).toHaveLength(1);
		});
	});

	it("should show all topbar items on large sized screens", () => {
		const { topbar } = setup();

		const iconBtns = topbar.findAllComponents({ name: "TopbarItem" });
		const schoolName = topbar.find("[data-testid=school-name]");
		const schoolLogo = topbar.find("[data-testid=school-logo]");
		const userMenu = topbar.findComponent({ name: "UserMenu" });

		expect(iconBtns.length).toStrictEqual(2);
		expect(schoolName.exists()).toBe(true);
		expect(schoolLogo.exists()).toBe(true);
		expect(userMenu.exists()).toBe(true);
	});

	it("should not show school logo on medium sized screens", () => {
		const { topbar } = setup(1200);

		const iconBtns = topbar.findAllComponents({ name: "TopbarItem" });
		const schoolName = topbar.find("[data-testid=school-name]");
		const schoolLogo = topbar.find("[data-testid=school-logo]");
		const userMenu = topbar.findComponent({ name: "UserMenu" });

		expect(iconBtns.length).toStrictEqual(2);
		expect(schoolName.exists()).toBe(true);
		expect(schoolLogo.exists()).toBe(false);
		expect(userMenu.exists()).toBe(true);
	});

	it("should only show status alerts and user menu on small sized screens", () => {
		const { topbar } = setup(500);

		const iconBtns = topbar.findAllComponents({ name: "TopbarItem" });
		const schoolName = topbar.find("[data-testid=school-name]");
		const schoolLogo = topbar.find("[data-testid=school-logo]");
		const userMenu = topbar.findComponent({ name: "UserMenu" });

		expect(iconBtns.length).toStrictEqual(1);
		expect(schoolName.exists()).toBe(false);
		expect(schoolLogo.exists()).toBe(false);
		expect(userMenu.exists()).toBe(true);
	});
});
