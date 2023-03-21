import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHeaderTitleInput from "./CardHeaderTitleInput.vue";

describe("CardHeaderTitleInput Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardHeaderTitleInput as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				value: "props value",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper).toBeDefined();
		});

		it("should emit if value changes", async () => {
			setup();
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			textAreaComponent.vm.$emit("change", "new title");
			const emitted = wrapper.emitted();

			expect(emitted.change?.toString()).toContain("new title");
		});
	});
});
