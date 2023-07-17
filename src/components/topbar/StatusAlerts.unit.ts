import { mount, MountOptions } from "@vue/test-utils";
import StatusAlerts from "./StatusAlerts.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

const testProps = {
	statusAlerts: mockStatusAlerts,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(StatusAlerts as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@/components/topbar/StatusAlerts", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores();
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(testProps);
		expect(wrapper.vm.statusAlerts).toStrictEqual(testProps.statusAlerts);
	});

	it("should not render status alert items, when none are given", () => {
		const wrapper = getWrapper();

		expect(wrapper.findAll("v-list-item")).toHaveLength(0);
	});

	it("should show alert title", () => {
		const wrapper = getWrapper(testProps);
		const title = wrapper.find("[data-test-id='alert-title-0']");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].title);
	});

	it("should show alert text", () => {
		const wrapper = getWrapper(testProps);
		const title = wrapper.find("[data-test-id='alert-text-0']");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].text);
	});

	it("should show multiple alerts", () => {
		const wrapper = getWrapper(testProps);
		const title0 = wrapper.find("[data-test-id='alert-title-0']");
		expect(title0.element.textContent).toContain(mockStatusAlerts[0].title);
		const title1 = wrapper.find("[data-test-id='alert-title-1']");
		expect(title1.element.textContent).toContain(mockStatusAlerts[1].title);
		const title2 = wrapper.find("[data-test-id='alert-title-2']");
		expect(title2.element.textContent).toContain(mockStatusAlerts[2].title);
	});
});

describe("getCreatedDate", () => {
	it("should be getCreatedDate function on the template", () => {
		const wrapper = getWrapper(testProps);
		const expectedDate = "05.05.2023 12:34";
		const alertElement = wrapper.find(".alert-date");
		expect(alertElement.element.innerHTML).toContain(expectedDate);
	});

	it("should returns expected result", () => {
		const wrapper = getWrapper(testProps);
		const expectedDate = "05.05.2023 12:34";
		const dateTime = "May 5, 2023 12:34 PM";
		expect(wrapper.vm.getCreatedDate(dateTime)).toEqual(expectedDate);
	});
});
