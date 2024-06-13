import { mount } from "@vue/test-utils";
import Topbar from "./Topbar.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createModuleMocks } from "@/utils/mock-store-module";
import { AUTH_MODULE_KEY, STATUS_ALERTS_MODULE_KEY } from "@/utils/inject";
import AuthModule from "@/store/auth";
import StatusAlertsModule from "@/store/status-alerts";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { h, nextTick } from "vue";
import { VApp } from "vuetify/lib/components/index.mjs";

describe("@ui-layout/Topbar", () => {
	const setup = async (windowWidth = 1300) => {
		const authModule = createModuleMocks(AuthModule, {
			getSchool: {
				id: "234",
				name: "School",
				logo: {
					url: "url",
				},
			},
			getUser: {
				id: "123",
				firstName: "Arthur",
				lastName: "Dent",
			},
			getUserRoles: ["administrator"],
		});

		const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
			getStatusAlerts: mockStatusAlerts,
		});

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const wrapper = mount(VApp, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
				},
			},
			slots: {
				default: h(Topbar, {
					sidebarExpanded: true,
				}),
			},
		});

		await nextTick();
		await nextTick();
		const topbar = wrapper.findComponent({ name: "Topbar" });
		return { wrapper, topbar };
	};

	it("should render component", async () => {
		const { wrapper } = await setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should emit sidebar-toggled", async () => {
		const { wrapper, topbar } = await setup();
		const sidebarToggle = wrapper.findComponent({ name: "VAppBarNavIcon" });
		await sidebarToggle.trigger("click");

		expect(topbar.emitted("sidebar-toggled")).toHaveLength(1);
	});

	it("should show all topbar items on large sized screens", async () => {
		const { topbar } = await setup();

		const iconBtns = topbar.findAllComponents({ name: "TopbarItem" });
		const schoolName = topbar.find("[data-testid=school-name]");
		const schoolLogo = topbar.find("[data-testid=school-logo]");
		const userMenu = topbar.findComponent({ name: "UserMenu" });

		expect(iconBtns.length).toStrictEqual(2);
		expect(schoolName.exists()).toBe(true);
		expect(schoolLogo.exists()).toBe(true);
		expect(userMenu.exists()).toBe(true);
	});

	it("should not show school logo on medium sized screens", async () => {
		const { topbar } = await setup(1200);

		const iconBtns = topbar.findAllComponents({ name: "TopbarItem" });
		const schoolName = topbar.find("[data-testid=school-name]");
		const schoolLogo = topbar.find("[data-testid=school-logo]");
		const userMenu = topbar.findComponent({ name: "UserMenu" });

		expect(iconBtns.length).toStrictEqual(2);
		expect(schoolName.exists()).toBe(true);
		expect(schoolLogo.exists()).toBe(false);
		expect(userMenu.exists()).toBe(true);
	});

	it("should only show status alerts and user menu on small sized screens", async () => {
		const { topbar } = await setup(500);

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
