import TheTopBar from "./TheTopBar";
import setupStores from "@@/tests/test-utils/setupStores";
//import { statusAlertsModule } from "@/store";
import StatusAlertsModule from "@/store/statusAlerts";
import { initializeAxios } from "@utils/api";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";

const mockActions = [
	{ type: "popupIcon", icon: "house", title: "test home", component: "v-icon" },
	{
		type: "popupIcon",
		icon: "camera",
		title: "test camera",
		component: "menu-qr-code",
	},
];

initializeAxios({
	$get: async (path) => {
		if (path === "/v1/alert") return mockStatusAlerts;
	},
});

describe("@components/legacy/TheTopBar", () => {
	beforeEach(() => {
		setupStores({
			statusAlerts: StatusAlertsModule,
		});
		//statusAlertsModule.setStatusAlerts(mockStatusAlerts);
	});

	it(...isValidComponent(TheTopBar));
	const $theme = {
		name: "test",
		logo: {
			app: "none",
		},
	};
	it("Render defaults", () => {
		const wrapper = shallowMount(TheTopBar, {
			...createComponentMocks({
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.find(".action").exists()).toBe(false);
	});

	it("Render with links and buttons", () => {
		const wrapper = shallowMount(TheTopBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				actions: mockActions,
				user: {
					firstName: "Arthur",
					lastName: "Dent",
					roles: [{ name: "administrator" }],
				},
				school: {
					name: "dummy school",
				},
			},
			mocks: {
				$theme,
			},
		});
		expect(wrapper.findAll("base-button-stub")).toHaveLength(2);
		expect(wrapper.findAll("popup-icon-stub")).toHaveLength(2);
		expect(wrapper.findAll("button")).toHaveLength(1);
		wrapper.find("button").trigger("click");
		expect(wrapper.emitted("action")[0]).toStrictEqual(["logout"]);
		expect(wrapper.findAll(".item")).toHaveLength(5);
	});
	it("can switch to fullscreen mode", () => {
		const wrapper = mount(TheTopBar, {
			propsData: {
				fullscreenMode: true,
			},
		});

		wrapper.find(".fullscreen-button").trigger("click");
		expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);

		expect(wrapper.findAll(".item")).toHaveLength(0);
		expect(wrapper.findAll(".top-sidebar")).toHaveLength(0);
		expect(wrapper.findAll(".fullscreen-button-active")).toHaveLength(1);
	});

	it("render with Status Alerts", async () => {
		const wrapper = shallowMount(TheTopBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				showStatusAlerts: true,
			},
			mocks: {
				$theme,
			},
		});

		expect(wrapper.findAll("status-alerts-stub")).toHaveLength(1);
		//const alertsIcon = wrapper.find("[data-testid=status-alerts-icon]");
		//expect(alertsIcon.element.innerHTML).toContain('fa-exclamation-triangle');
	});
	it("Should not render Status Alerts", async () => {
		const wrapper = shallowMount(TheTopBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				showStatusAlerts: false,
			},
			mocks: {
				$theme,
			},
		});

		expect(wrapper.findAll("status-alerts-stub")).toHaveLength(0);
	});
});
