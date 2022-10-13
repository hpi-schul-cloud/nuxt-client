import TheTopBar from "./TheTopBar";
import setupStores from "@@/tests/test-utils/setupStores";
import StatusAlertsModule from "@/store/statusAlerts";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { statusAlertsModule } from "@/store";

const mockActions = [
	{ type: "popupIcon", icon: "house", title: "test home", component: "v-icon" },
	{
		type: "popupIcon",
		icon: "camera",
		title: "test camera",
		component: "menu-qr-code",
	},
];

describe("@components/legacy/TheTopBar", () => {
	beforeEach(() => {
		setupStores({
			statusAlerts: StatusAlertsModule,
		});
	});

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TheTopBar, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			...attrs,
		});

		return wrapper;
	};

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
				showStatusAlerts: false,
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
				showStatusAlerts: false,
			},
		});
		wrapper.find(".fullscreen-button").trigger("click");
		expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);
		expect(wrapper.findAll(".item")).toHaveLength(0);
		expect(wrapper.findAll(".top-sidebar")).toHaveLength(0);
		expect(wrapper.findAll(".fullscreen-button-active")).toHaveLength(1);
	});

	it("render with Status Alerts", async () => {
		jest.spyOn(statusAlertsModule, "fetchStatusAlerts").mockImplementation();
		statusAlertsModule.setStatusAlerts(mockStatusAlerts);

		const wrapper = mountComponent({
			propsData: {
				showStatusAlerts: true,
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll("[data-testid=status-alerts-icon]")).toHaveLength(1);

		expect(wrapper.findAll(".alert-item")).toHaveLength(
			mockStatusAlerts.length
		);
	});

	it("Should not render Status Alerts", async () => {
		const wrapper = mountComponent({
			propsData: {
				showStatusAlerts: false,
			},
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.findAll("[data-testid=status-alerts-icon]")).toHaveLength(0);
	});
});
