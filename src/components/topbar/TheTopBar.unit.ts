import Vue from "vue";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import AuthModule from "@/store/auth";
import StatusAlertsModule from "@/store/status-alerts";
import {
	I18N_KEY,
	AUTH_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
} from "@/utils/inject";
import TheTopBar from "./TheTopBar.vue";
import { StatusAlert } from "@/store/types/status-alert";

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

	return mount(TheTopBar as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			[I18N_KEY as symbol]: { t: (key: string) => key },
			[AUTH_MODULE_KEY.valueOf()]: authModule,
			[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
		},
		propsData: props,
		attachTo: document.body,
	});
};

describe("@/components/topbar/TheTopBar", () => {
	describe("when user is logged in with no status alerts", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			wrapper = getWrapper({
				user: {
					firstName: "Arthur",
					lastName: "Dent",
					roles: [{ name: "administrator" }],
				},
				school: {
					name: "dummy school",
				},
			});
		});

		it("should render action buttons correctly", () => {
			expect(wrapper.find("[data-test-id='top-menu-btn']").exists()).toBe(true);
			expect(wrapper.find("[data-test-id='status-alerts-icon']").exists()).toBe(
				false
			);
			expect(wrapper.find("[data-test-id='fullscreen-btn']").exists()).toBe(
				true
			);
			expect(wrapper.find("[data-test-id='qr-code-btn']").exists()).toBe(true);
			expect(wrapper.find("[data-testid='initials']").exists()).toBe(true);
		});

		it("should not render status alert icon", () => {
			expect(wrapper.find("[data-test-id='status-alerts-icon']").exists()).toBe(
				false
			);
		});
	});

	describe("when status alerts exist", () => {
		it("should render status alerts icon", async () => {
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
			await wrapper.vm.$nextTick();

			expect(
				wrapper.findAll('[data-test-id="status-alerts-icon"]')
			).toHaveLength(1);
			expect(wrapper.findAll(".alert-item")).toHaveLength(
				mockStatusAlerts.length
			);
		});
	});

	describe("when enabling/disabling fullscreen mode", () => {
		it("should emit fullscreen event when enabling", async () => {
			const wrapper = getWrapper({
				fullscreenMode: false,
			});

			const expandBtn = wrapper.find('[data-test-id="fullscreen-btn"]');
			expect(expandBtn.exists()).toBe(true);

			await expandBtn.trigger("click");

			expect(wrapper.emitted("action")).toBeTruthy();
			expect(wrapper.emitted("action")).toHaveLength(1);
			const action = wrapper.emitted("action") as any[][];

			expect(action[0]).toStrictEqual(["fullscreen"]);
		});

		it("should emit fullcreen event", async () => {
			const wrapper = getWrapper({
				fullscreenMode: true,
			});

			const collapseBtn = wrapper.find(".fullscreen-button-active");
			expect(collapseBtn.exists()).toBe(true);

			await collapseBtn.trigger("click");

			expect(wrapper.emitted("action")).toBeTruthy();
			expect(wrapper.emitted("action")).toHaveLength(1);
			const action = wrapper.emitted("action") as any[][];

			expect(action[0]).toStrictEqual(["fullscreen"]);
		});
	});

	it("should emit logout event", async () => {
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
		await wrapper.vm.$nextTick();

		const initials = wrapper.find("[data-testid='initials']");
		await initials.trigger("click");

		const logoutBtn = wrapper.find("[data-testid='logout']");
		expect(wrapper.find("[data-testid='logout']").exists()).toBe(true);

		await logoutBtn.trigger("click");

		expect(wrapper.emitted("action")).toBeTruthy();
		expect(wrapper.emitted("action")).toHaveLength(1);
		const action = wrapper.emitted("action") as any[][];

		expect(action[0]).toStrictEqual(["logout"]);
	});
});
