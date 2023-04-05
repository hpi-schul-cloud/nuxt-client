import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";

describe("BoardColumnHeader", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		wrapper = shallowMount(BoardColumnHeader as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				title: "title-text",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnHeader).exists()).toBe(true);
			expect(wrapper.findComponent(InlineEditInteractionHandler).exists()).toBe(
				true
			);
		});
	});

	describe("when the title updated", () => {
		it("should emit 'update:title'", () => {
			setup();

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value");

			const emitted = wrapper.emitted();
			expect(emitted["update:title"]).toBeDefined();
		});
	});
});
