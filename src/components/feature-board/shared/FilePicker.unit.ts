import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import FilePicker from "./FilePicker.vue";
jest.mock("../shared/EditMode.composable");

describe("FilePicker", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(FilePicker as MountOptions<Vue>, {
			...createComponentMocks({}),
		});
		const filePicker = wrapper.findComponent({ name: "FilePicker" });

		return { filePicker };
	};

	it("should be found in dom", () => {
		setup();
		expect(wrapper.findComponent(FilePicker).exists()).toBe(true);
	});
});
