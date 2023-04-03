import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardSkeleton from "./CardSkeleton.vue";

describe("CardSkeleton", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: object) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardSkeleton as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ height: 400 });
			expect(wrapper.findComponent(CardSkeleton).exists()).toBe(true);
		});
	});
});
