import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardAnyTitleInput from "./BoardAnyTitleInput.vue";
import { useBoardPermissions } from "./BoardPermissions.composable";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "../types/Permissions";

jest.mock("./InlineEditInteractionHandler.composable");

jest.mock("./BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

describe("BoardAnyTitleTitleInput", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isEditMode: boolean;
		permissions?: BoardPermissionChecks;
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
	});
});
