import { mount } from "@vue/test-utils";
import StatusAlerts from "./StatusAlerts.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";

declare var createComponentMocks: Function;

const testProps = {
	statusAlerts: mockStatusAlerts,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(StatusAlerts, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/StatusAlerts", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores();
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(testProps);
		expect(wrapper.vm.statusAlerts).toStrictEqual(testProps.statusAlerts);
	});

	it("should show alert title", () => {
		const wrapper = getWrapper(testProps);
		const title = wrapper.find("[data-testid=alert-title0]");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].title);
	});

	it("should show alert text", () => {
		const wrapper = getWrapper(testProps);
		const title = wrapper.find("[data-testid=alert-text0]");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].text);
	});

	it("should show the alert url", () => {
		const wrapper = getWrapper(testProps);
		const title = wrapper.find("[data-testid=alert-link0]");
		expect(title.element.href).toContain(mockStatusAlerts[0].url);
	});

	it("should show multiple alerts", () => {
		const wrapper = getWrapper(testProps);
		const title0 = wrapper.find("[data-testid=alert-title0]");
		expect(title0.element.textContent).toContain(mockStatusAlerts[0].title);
		const title1 = wrapper.find("[data-testid=alert-title1]");
		expect(title1.element.textContent).toContain(mockStatusAlerts[1].title);
		const title2 = wrapper.find("[data-testid=alert-title2]");
		expect(title2.element.textContent).toContain(mockStatusAlerts[2].title);
	});
});
