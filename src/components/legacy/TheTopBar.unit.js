import setupStores from "@@/tests/test-utils/setupStores";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import AuthModule from "@/store/auth";
import StatusAlertsModule from "@/store/status-alerts";
import { statusAlertsModule } from "@/store";
import TheTopBar from "./TheTopBar";

const getWrapper = (props, options) => {
	return mount(TheTopBar, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
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
		it("should render action buttons correctly", async () => {
			jest
				.spyOn(statusAlertsModule, "fetchStatusAlerts")
				.mockImplementation(() => {
					statusAlertsModule.setStatusAlerts([]);
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
				wrapper.findAll("[data-test-id='status-alerts-icon']")
			).toHaveLength(1);
			expect(wrapper.findAll(".alert-item")).toHaveLength(
				mockStatusAlerts.length
			);
		});
	});

	it("should be able to switch to full screen mode", () => {
		const wrapper = getWrapper({
			fullscreenMode: true,
		});

		wrapper.find(".fullscreen-button").trigger("click");
		expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);
		expect(wrapper.findAll(".item")).toHaveLength(0);
		expect(wrapper.findAll(".top-sidebar")).toHaveLength(0);
		expect(wrapper.findAll(".fullscreen-button-active")).toHaveLength(1);
	});

	// it("should emit logout event", async () => {
	// 	authModule.setAccessToken("asdf");

	// 	const wrapper = getWrapper({
	// 		user: {
	// 			firstName: "Arthur",
	// 			lastName: "Dent",
	// 			roles: [{ name: "administrator" }],
	// 		},
	// 		school: {
	// 			name: "dummy school",
	// 		},
	// 	});
	// 	await wrapper.vm.$nextTick();

	// 	const initials = wrapper.find("[data-testid='initials']");
	// 	await initials.trigger("click");

	// 	const logoutBtn = initials.find("[data-testid='logout']");
	// 	expect(wrapper.find("[data-testid='logout']").exists()).toBe(true);

	// 	await logoutBtn.trigger("click");
	// 	expect(wrapper.emitted("action")[0]).toStrictEqual(["logout"]);
	// });
});
