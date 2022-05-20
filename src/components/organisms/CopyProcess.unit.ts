import { mount } from "@vue/test-utils";
import CopyProcess from "./CopyProcess.vue";

declare let createComponentMocks: Function;

const propsData = {
	data: {
		title: "Aufgabe",
		type: "task",
		status: "partial",
		id: "12345",
		elements: [
			{ title: "metadata", type: "leaf", status: "success" },
			{ title: "description", type: "leaf", status: "success" },
			{ title: "submissions", type: "leaf", status: "not-doing" },
			{ title: "files", type: "leaf", status: "not-implemented" },
		],
	},
	isOpen: false,
	loading: false,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(CopyProcess, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/organisms/CopyProcess", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props and configuration", async () => {
		const wrapper = getWrapper(propsData);

		expect(wrapper.vm.data).toStrictEqual(propsData.data);
		expect(wrapper.vm.isOpen).toStrictEqual(propsData.isOpen);
		expect(wrapper.vm.loading).toStrictEqual(propsData.loading);
	});
});
