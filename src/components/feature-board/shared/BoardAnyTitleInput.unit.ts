import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardAnyTitleInput from "./BoardAnyTitleInput.vue";
import { useBoardPermissions } from "./BoardPermissions.composable";
import { BoardPermissionsTypes } from "../types/Board";

jest.mock("./InlineEditInteractionHandler.composable");

jest.mock("./BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const defaultPermissions = {
	hasEditPermission: true,
};

describe("BoardAnyTitleTitleInput", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isEditMode: boolean;
		permissions?: BoardPermissionsTypes;
	}) => {
		document.body.setAttribute("data-app", "true");
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		wrapper = shallowMount(BoardAnyTitleInput as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				value: "props value",
				isEditMode: options.isEditMode,
				scope: "card",
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

		it("should emit if value changes", async () => {
			setup({ isEditMode: true });
			const newValue = "new title";
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			textAreaComponent.vm.$emit("input", "new title");
			const emitted = wrapper.emitted();

			if (emitted["update:value"] === undefined) {
				throw new Error("Emitted should be defined");
			}

			expect(emitted["update:value"][0][0]).toContain(newValue);
		});

		it("should emit enter on hitting 'enter' key", async () => {
			setup({ isEditMode: true });
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			textAreaComponent.vm.$emit(
				"keydown",
				new KeyboardEvent("keydown", {
					key: "Enter",
				})
			);
			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});
	});
});
