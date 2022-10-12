import { mount } from "@vue/test-utils";
import { provide } from "@nuxtjs/composition-api";
//import { statusAlertsModule } from "@/store";
import StatusAlertsModule from "@/store/statusAlerts";
import { createModuleMocks } from "@/utils/mock-store-module";
import setupStores from "@@/tests/test-utils/setupStores";
//import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import TheTopBar from "./TheTopBar.vue";

// const mockActions = [
// 	{ type: "popupIcon", icon: "house", title: "test home", component: "v-icon" },
// 	{
// 		type: "popupIcon",
// 		icon: "camera",
// 		title: "test camera",
// 		component: "menu-qr-code",
// 	},
// ];

let statusAlertsModuleMock;

const getWrapper = (props, options) => {
	return mount(TheTopBar, {
		...createComponentMocks({
			mocks: {
				name: "theme",
				logo: {
					app: "none",
				},
			},
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		attachTo: document.body,
		setup() {
			provide("taskModule", statusAlertsModuleMock);
			provide("i18n", { t: (key) => key });
		},
		...options,
	});
};

describe("@components/legacy/TheTopBar", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			statusAlerts: StatusAlertsModule,
		});
		statusAlertsModuleMock = createModuleMocks(StatusAlertsModule);
	});

	it(...isValidComponent(TheTopBar));

	it("renders defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.find(".action").exists()).toBe(false);
	});

	// it("renders with links and buttons", () => {
	// 	const wrapper = getWrapper({
	// 		actions: mockActions,
	// 		showStatusAlerts: false,
	// 		user: {
	// 			firstName: "Arthur",
	// 			lastName: "Dent",
	// 			roles: [{ name: "administrator" }],
	// 		},
	// 		school: {
	// 			name: "dummy school",
	// 		},
	// 	});

	// 	expect(wrapper.findAll("base-button-stub")).toHaveLength(2);
	// 	expect(wrapper.findAll("popup-icon-stub")).toHaveLength(2);
	// 	expect(wrapper.findAll("button")).toHaveLength(1);
	// 	wrapper.find("button").trigger("click");
	// 	expect(wrapper.emitted("action")[0]).toStrictEqual(["logout"]);
	// 	expect(wrapper.findAll(".item")).toHaveLength(5);
	// });

	it("can switch to fullscreen mode", () => {
		const wrapper = getWrapper({
			fullscreenMode: true,
			showStatusAlerts: false,
		});

		wrapper.find(".fullscreen-button").trigger("click");
		expect(wrapper.emitted().action[0]).toStrictEqual(["fullscreen"]);
		expect(wrapper.findAll(".item")).toHaveLength(0);
		expect(wrapper.findAll(".top-sidebar")).toHaveLength(0);
		expect(wrapper.findAll(".fullscreen-button-active")).toHaveLength(1);
	});

	// it("renders with status alerts", async () => {
	// 	const wrapper = getWrapper({
	// 		showStatusAlerts: true,
	// 	});

	// 	//console.log(wrapper.vm);

	// 	statusAlertsModule.setStatusAlerts(mockStatusAlerts);
	// 	await wrapper.vm.$nextTick();

	// 	expect(wrapper.vm.showStatusAlertIcon).toBe(true);

	// 	// expect(wrapper.findAll("[data-testid='status-alerts-icon']")).toHaveLength(
	// 	// 	1
	// 	// );

	// 	// expect(wrapper.findAll(".alert-item")).toHaveLength(
	// 	// 	mockStatusAlerts.length
	// 	// );
	// });

	it("should not render status alerts", async () => {
		const wrapper = getWrapper({
			showStatusAlerts: true,
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.findAll("[data-testid='status-alerts-icon']")).toHaveLength(
			0
		);
	});
});
