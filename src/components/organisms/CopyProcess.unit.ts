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

const changedPropsData = [
	{
		id: "12345",
		status: "partial",
		title: "Aufgabe",
		type: "task",
		index: 0,
		elements: [
			{ title: "metadata", type: "leaf", status: "success", index: 1 },
			{ title: "description", type: "leaf", status: "success", index: 2 },
			{ title: "submissions", type: "leaf", status: "failure", index: 3 },
			{ title: "files", type: "leaf", status: "failure", index: 4 },
		],
	},
];

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

	it("should change the data to an array for using the component ", async () => {
		const wrapper = getWrapper(propsData);

		expect(wrapper.vm.data).toStrictEqual(propsData.data);
		expect(wrapper.vm.copiedItems).toStrictEqual(changedPropsData);
	});
});
