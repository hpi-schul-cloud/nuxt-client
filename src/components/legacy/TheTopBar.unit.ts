import setupStores from "@@/tests/test-utils/setupStores";
import StatusAlertsModule from "@/store/statusAlerts";
import { statusAlertsModule } from "@/store";


import { mount } from "@vue/test-utils";
import TheTopBar from "./TheTopBar.vue";
import { initializeAxios } from "@utils/api";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import {NuxtAxiosInstance} from "@nuxtjs/axios";
declare var createComponentMocks: Function;


const axiosInitializer = () => {
	initializeAxios({
		$get: async (path: string) => {
			if (path === "/v1/alert") return mockStatusAlerts;
		},
	} as NuxtAxiosInstance);
};
axiosInitializer();

const getWrapper: any = (props: object, options?: object) => {
	return mount(TheTopBar, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

const mockActions = [
	{ type: "popupIcon", icon: "house", title: "test home", component: "v-icon" },
	{
		type: "popupIcon",
		icon: "camera",
		title: "test camera",
		component: "menu-qr-code",
	},
];
const mockData = {
	actions: mockActions,
	user: {
		firstName: "Arthur",
		lastName: "Dent",
		roles: [{name: "administrator"}],
	},
	school: {
		name: "dummy school",
	},
	showStatusAlerts: true,
};

describe("TheTopBar", () => {
	beforeAll(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			'status-alerts': StatusAlertsModule,
		});
	});
	it('should show the StatusAlerts icon', async () => {
		/*
		const fetchMock = jest.spyOn(
			statusAlertsModule,
			"fetchStatusAlerts"
		);
		fetchMock.mockResolvedValue(mockStatusAlerts as any);*/

		const wrapper = getWrapper(mockData);
		await wrapper.vm.$nextTick();
		const alertsIcon = wrapper.find("[data-testid=status-alerts-icon]");
		//console.log(alertsIcon.element.innerHTML);
		expect(alertsIcon.element.innerHTML).toContain('fa-exclamation-triangle')
	});
});
