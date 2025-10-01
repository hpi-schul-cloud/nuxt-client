import CardSkeleton from "./CardSkeleton.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("CardSkeleton", () => {
	const setup = (props: { height: number }) => {
		document.body.setAttribute("data-app", "true");
		const wrapper = shallowMount(CardSkeleton, {
			global: {
				plugins: [createTestingVuetify()],
			},
			propsData: props,
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ height: 400 });
			expect(wrapper.findComponent(CardSkeleton).exists()).toBe(true);
		});
	});
});
