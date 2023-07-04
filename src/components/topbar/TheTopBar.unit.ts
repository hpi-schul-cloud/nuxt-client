import Vue from "vue";
import setupStores from "@@/tests/test-utils/setupStores";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import StatusAlertsModule from "@/store/status-alerts";
import { statusAlertsModule, authModule } from "@/store";
import { I18N_KEY } from "@/utils/inject";
import TheTopBar from "./TheTopBar.vue";

let envConfigModuleMock: EnvConfigModule;
let authModuleMock: AuthModule;

const getWrapper = (props?: object, options?: object) => {
	return mount(TheTopBar as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			[I18N_KEY as symbol]: { t: (key: string) => key },
			authModule: authModuleMock,
			envConfigModule: envConfigModuleMock,
		},
		propsData: props,
		attachTo: document.body,
		...options,
	});
};

describe("@/components/topbar/TheTopBar", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			statusAlertsModule: StatusAlertsModule,
		});
	});

	describe("when user is logged in with no status alerts", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			jest
				.spyOn(statusAlertsModule, "fetchStatusAlerts")
				.mockImplementation(() => {
					statusAlertsModule.setStatusAlerts([]);
					return Promise.resolve();
				});

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
			const fetchStatusAlertsSpy = jest
				.spyOn(statusAlertsModule, "fetchStatusAlerts")
				.mockImplementation(() => {
					statusAlertsModule.setStatusAlerts(mockStatusAlerts);
					return Promise.resolve();
				});

			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();

			expect(fetchStatusAlertsSpy).toHaveBeenCalled();

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
		authModule.setUser({
			permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
			roles: [{ name: "administrator" }],
			__v: 0,
			_id: "asdf",
			id: "asdf",
			firstName: "Arthur",
			lastName: "Dent",
			email: "arthur.dent@hitchhiker.org",
			updatedAt: "",
			birthday: "",
			createdAt: "",
			preferences: {},
			schoolId: "",
			emailSearchValues: [],
			firstNameSearchValues: [],
			lastNameSearchValues: [],
			consent: {},
			forcePasswordChange: false,
			language: "",
			fullName: "",
			avatarInitials: "",
			avatarBackgroundColor: "",
			age: 0,
			displayName: "",
			accountId: "",
			schoolName: "",
			externallyManaged: false,
		});
		authModule.setAccessToken("asdf");
		authModuleMock = createModuleMocks(AuthModule, {
			getLocale: "de",
		});

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
