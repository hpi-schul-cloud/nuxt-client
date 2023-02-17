import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardSkeleton from "./CardSkeleton.vue";

describe("BoardColumn", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: object) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardSkeleton, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ height: 400 });
			expect(wrapper.findComponent(CardSkeleton).exists()).toBe(true);
		});

		it("should render Vcard component with 'height' property", async () => {
			setup({ height: 400 });
			expect(wrapper.vm.$children[0].$props.height).toStrictEqual(400);
		});
	});
});
