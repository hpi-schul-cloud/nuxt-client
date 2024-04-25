import { createModuleMocks } from "@/utils/mock-store-module";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { mount } from "@vue/test-utils";
import AuthModule from "@/store/auth";
import StatusAlertsModule from "@/store/status-alerts";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
} from "@/utils/inject";
import TheTopBar from "./TheTopBar.vue";
import { StatusAlert } from "@/store/types/status-alert";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import EnvConfigModule from "@/store/env-config";

const getWrapper = (props?: object, statusAlerts: StatusAlert[] = []) => {
	const authModule = createModuleMocks(AuthModule, {
		getUserPermissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
		getUserRoles: ["administrator"],
		getAccessToken: "asdf",
		getLocale: "de",
	});

	const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
		getStatusAlerts: statusAlerts,
	});

	const envConfigModule = createModuleMocks(EnvConfigModule, {});

	const wrapper = mount(TheTopBar, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[AUTH_MODULE_KEY.valueOf()]: authModule,
				[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
			},
		},
		props,
	});

	return wrapper;
};

describe("@/components/topbar/TheTopBar", () => {
	describe("when user is logged in with no status alerts", () => {
		const setup = () => {
			const wrapper = getWrapper({
				user: {
					firstName: "Arthur",
					lastName: "Dent",
					roles: [{ name: "administrator" }],
				},
				school: {
					name: "dummy school",
				},
			});

			return { wrapper };
		};

		it("should render action buttons correctly", () => {
			const { wrapper } = setup();
			expect(wrapper.find("[data-testid='top-menu-btn']").exists()).toBe(true);
			expect(wrapper.find("[data-testid='status-alerts-icon']").exists()).toBe(
				false
			);
			expect(wrapper.find("[data-testid='fullscreen-btn']").exists()).toBe(
				true
			);
			expect(wrapper.find("[data-testid='qr-code-btn']").exists()).toBe(true);
			expect(wrapper.find("[data-testid='initials']").exists()).toBe(true);
		});

		it("should not render status alert icon", () => {
			const { wrapper } = setup();
			expect(wrapper.find("[data-testid='status-alerts-icon']").exists()).toBe(
				false
			);
		});
	});

	describe("when status alerts exist", () => {
		const setup = () => {
			const wrapper = getWrapper(
				{
					user: {
						firstName: "Arthur",
						lastName: "Dent",
						roles: [{ name: "administrator" }],
					},
					school: {
						name: "dummy school",
					},
				},
				mockStatusAlerts
			);

			return { wrapper };
		};

		it("should render status alerts icon", async () => {
			const { wrapper } = setup();
			expect(
				wrapper.findAll('[data-testid="status-alerts-icon"]')
			).toHaveLength(1);
			expect(wrapper.findAll(".alert-item")).toHaveLength(
				mockStatusAlerts.length
			);
		});
	});

	describe("when fullscreen mode is disabled", () => {
		const setup = () => {
			const wrapper = getWrapper({
				fullscreenMode: false,
			});

			return { wrapper };
		};

		it("should emit fullscreen event", async () => {
			const { wrapper } = setup();

			const expandBtn = wrapper.find('[data-testid="fullscreen-btn"]');
			expect(expandBtn.exists()).toBe(true);

			await expandBtn.trigger("click");

			expect(wrapper.emitted("action")).toBeTruthy();
			expect(wrapper.emitted("action")).toHaveLength(1);

			expect(wrapper.emitted("action")).toStrictEqual([["fullscreen"]]);
		});
	});

	describe("when fullscreen mode is enabled", () => {
		const setup = () => {
			const wrapper = getWrapper({
				fullscreenMode: true,
			});

			return { wrapper };
		};

		it("should emit fullcreen event", async () => {
			const { wrapper } = setup();

			const collapseBtn = wrapper.find(".fullscreen-button-active");
			expect(collapseBtn.exists()).toBe(true);

			await collapseBtn.trigger("click");

			expect(wrapper.emitted("action")).toBeTruthy();
			expect(wrapper.emitted("action")).toHaveLength(1);

			expect(wrapper.emitted("action")).toStrictEqual([["fullscreen"]]);
		});
	});

	describe("when a user logs out", () => {
		const setup = () => {
			const wrapper = getWrapper({
				user: {
					firstName: "Arthur",
					lastName: "Dent",
					roles: [{ name: "administrator" }],
				},
				school: {
					name: "dummy school",
				},
			});

			return { wrapper };
		};

		it("should emit logout event", async () => {
			const { wrapper } = setup();
			const initials = wrapper.find("[data-testid='initials']");
			await initials.trigger("click");

			const logoutBtn = wrapper.find("[data-testid='logout']");
			expect(wrapper.find("[data-testid='logout']").exists()).toBe(true);

			await logoutBtn.trigger("click");

			expect(wrapper.emitted("action")).toBeTruthy();
			expect(wrapper.emitted("action")).toHaveLength(1);

			expect(wrapper.emitted("action")).toStrictEqual([["logout"]]);
		});
	});
});
