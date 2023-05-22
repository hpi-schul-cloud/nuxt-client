import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import { ContentElementType, TextElementResponse } from "@/serverApi/v3";
import TextContentElementComponent from "./TextContentElement.vue";
import TextContentElementDisplayComponent from "./TextContentElementDisplay.vue";
import TextContentElementEditComponent from "./TextContentElementEdit.vue";

const TEST_ELEMENT: TextElementResponse = {
	id: "test-id",
	type: ContentElementType.Text,
	content: {
		text: "TestContent",
	},
	timestamps: {
		lastUpdatedAt: new Date().toString(),
		createdAt: new Date().toString(),
	},
};

/**
 * Call this function during test to mock a CardHostInteraction targeting the Hosting Component
 */
// let mockCardHostInteraction: () => void;

// jest.mock("./CardHostInteractionHandler.composable", () => ({
// 	useCardHostInteractionHandler: (callback: () => void) => {
// 		mockCardHostInteraction = () => callback();
// 		return {};
// 	},
// }));

describe("TextContentElement", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: {
		element: TextElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(TextContentElementComponent as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should render display if isEditMode is false", () => {
			setup({ element: TEST_ELEMENT, isEditMode: false });
			expect(
				wrapper.findComponent(TextContentElementDisplayComponent).exists()
			).toBe(true);
		});
		it("should render edit if isEditMode is true", () => {
			setup({ element: TEST_ELEMENT, isEditMode: true });
			expect(
				wrapper.findComponent(TextContentElementEditComponent).exists()
			).toBe(true);
		});
		it.skip("should set autofocus on edit-child when component is interacted with", async () => {
			setup({ element: TEST_ELEMENT, isEditMode: true });

			const editWrapper = wrapper.findComponent(
				TextContentElementEditComponent
			);
			// mockCardHostInteraction();
			await Vue.nextTick();
			await Vue.nextTick();
			expect(editWrapper.attributes("autofocus")).toBe("true");
		});
	});
});
