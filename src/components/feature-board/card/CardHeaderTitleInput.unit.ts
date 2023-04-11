import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHeaderTitleInput from "./CardHeaderTitleInput.vue";

describe("CardHeaderTitleInput Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardHeaderTitleInput as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				value: "props value",
				isEditMode: options.isEditMode,
			},
			provide: {
				CARD_HOST_INTERACTION_EVENT: undefined,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ isEditMode: false });
			expect(wrapper).toBeDefined();
		});

		it("should pass the value to its sub component", async () => {
			setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			expect(anyTitleInput.attributes("value")).toStrictEqual("props value");
		});
	});
});
