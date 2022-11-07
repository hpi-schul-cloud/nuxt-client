import { provide } from "@nuxtjs/composition-api";
import setupStores from "@@/tests/test-utils/setupStores";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import AuthModule from "@/store/auth";
import StatusAlertsModule from "@/store/status-alerts";
import { statusAlertsModule, authModule } from "@/store";
import TheTopBar from "./TheTopBar";

let authModuleMock;
let envConfigModuleMock;

const getWrapper = (props, options) => {
	return mount(TheTopBar, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		setup() {
			provide("authModule", authModuleMock);
			provide("envConfigModule", envConfigModuleMock);
		},
		propsData: props,
		attachTo: document.body,
		...options,
	});
};

describe("@components/legacy/TheTopBar", () => {
	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			"status-alerts": StatusAlertsModule,
		});
	});

	it(...isValidComponent(TheTopBar));

	describe("when user is logged in with no status alerts", () => {
		let wrapper;

		beforeEach(() => {
			jest
				.spyOn(statusAlertsModule, "fetchStatusAlerts")
				.mockImplementation(() => {
					statusAlertsModule.setStatusAlerts([]);
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
				});

			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();

			expect(fetchStatusAlertsSpy).toHaveBeenCalled();
			expect(wrapper.vm.showStatusAlertIcon).toStrictEqual(true);

			expect(
				wrapper.findAll('[data-test-id="status-alerts-icon"]')
			).toHaveLength(1);
			expect(wrapper.findAll(".v-list-item")).toHaveLength(
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
			expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);
		});

		it("should emit fullcreen event", async () => {
			const wrapper = getWrapper({
				fullscreenMode: true,
			});

			const collapseBtn = wrapper.find(".fullscreen-button-active");
			expect(collapseBtn.exists()).toBe(true);

			await collapseBtn.trigger("click");
			expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);
		});
	});

	it("should emit logout event", async () => {
		authModule.setUser({
			permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
			roles: [{ name: "administrator" }],
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
		expect(wrapper.emitted("action")[0]).toStrictEqual(["logout"]);
	});
});
