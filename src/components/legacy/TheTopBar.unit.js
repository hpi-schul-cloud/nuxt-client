import setupStores from "@@/tests/test-utils/setupStores";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import StatusAlertsModule from "@/store/status-alerts";
import { statusAlertsModule } from "@/store";
import TheTopBar from "./TheTopBar";

const mockActions = [
	{ type: "popupIcon", icon: "house", title: "test home", component: "v-icon" },
	{
		type: "popupIcon",
		icon: "camera",
		title: "test camera",
		component: "menu-qr-code",
	},
];

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
			"status-alerts": StatusAlertsModule,
		});
	});

	it(...isValidComponent(TheTopBar));

	// TODO - is this test useful?
	it("renders defaults", () => {
		const wrapper = getWrapper();

		expect(wrapper.find(".action").exists()).toBe(false);
	});

	it("renders with links and buttons", () => {
		const wrapper = getWrapper({
			actions: mockActions,
			user: {
				firstName: "Arthur",
				lastName: "Dent",
				roles: [{ name: "administrator" }],
			},
			school: {
				name: "dummy school",
			},
		});

		expect(wrapper.findAll(".item")).toHaveLength(5);
		// expect(wrapper.findAll("popup-icon-stub")).toHaveLength(2);
	});

	it("should emit logout event", () => {
		const wrapper = getWrapper({
			actions: mockActions,
			user: {
				firstName: "Arthur",
				lastName: "Dent",
				roles: [{ name: "administrator" }],
			},
			school: {
				name: "dummy school",
			},
		});

		const logoutBtn = wrapper.find("[data-testid='logout']");
		expect(wrapper.find("[data-testid='logout']").exists()).toBe(true);

		logoutBtn.trigger("click");
		expect(wrapper.emitted("action")[0]).toStrictEqual(["logout"]);
	});

	it("can switch to fullscreen mode", () => {
		const wrapper = getWrapper({
			fullscreenMode: true,
		});

		wrapper.find(".fullscreen-button").trigger("click");
		expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);
		expect(wrapper.findAll(".item")).toHaveLength(0);
		expect(wrapper.findAll(".top-sidebar")).toHaveLength(0);
		expect(wrapper.findAll(".fullscreen-button-active")).toHaveLength(1);
	});

	it("should render with status alerts", async () => {
		const fetchStatusAlertsSpy = jest
			.spyOn(statusAlertsModule, "fetchStatusAlerts")
			.mockImplementation(() => {
				statusAlertsModule.setStatusAlerts(mockStatusAlerts);
			});

		// jest.spyOn(statusAlertsModule, "fetchStatusAlerts").mockImplementation();
		// statusAlertsModule.setStatusAlerts(mockStatusAlerts);

		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();

		expect(fetchStatusAlertsSpy).toHaveBeenCalled();
		expect(wrapper.vm.showStatusAlertIcon).toStrictEqual(true);

		expect(wrapper.findAll("[data-test-id='status-alerts-icon']")).toHaveLength(
			1
		);
		expect(wrapper.findAll(".alert-item")).toHaveLength(
			mockStatusAlerts.length
		);
	});

	it("should not render status alerts", async () => {
		const fetchStatusAlertsSpy = jest
			.spyOn(statusAlertsModule, "fetchStatusAlerts")
			.mockImplementation(() => {
				statusAlertsModule.setStatusAlerts([]);
			});

		const wrapper = getWrapper();
		await wrapper.vm.$nextTick();

		expect(fetchStatusAlertsSpy).toHaveBeenCalled();
		expect(wrapper.vm.showStatusAlertIcon).toStrictEqual(false);

		expect(wrapper.findAll("[data-test-id='status-alerts-icon']")).toHaveLength(
			0
		);
	});
});
