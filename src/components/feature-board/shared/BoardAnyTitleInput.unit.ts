import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
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
const defaultProps = {
	value: "props value",
	isEditMode: true,
	scope: "card",
	placeholder: "placeholder-text",
	isFocused: false,
};

describe("BoardAnyTitleTitleInput", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (
		props: {
			isEditMode: boolean;
			scope: "card" | "column" | "board";
			placeholder?: string;
			isFocused?: boolean;
		},
		options?: {
			permissions?: BoardPermissionChecks;
		}
	) => {
		document.body.setAttribute("data-app", "true");
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		wrapper = mount(BoardAnyTitleInput as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				...defaultProps,
				...props,
			},
			provide: {
				CARD_HOST_INTERACTION_EVENT: undefined,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ isEditMode: false, scope: "card" });
			expect(wrapper).toBeDefined();
		});

		it("should emit if value changes", async () => {
			setup({ isEditMode: true, scope: "card" });
			const newValue = "new title";
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			textAreaComponent.vm.$emit("input", "new title");
			const emitted = wrapper.emitted();

			if (emitted["update:value"] === undefined) {
				throw new Error("Emitted should be defined");
			}

			expect(emitted["update:value"][0][0]).toContain(newValue);
		});

		it("should emit enter on hitting 'enter' key in card title", async () => {
			setup({ isEditMode: true, scope: "card" });
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

		it("should not emit enter on hitting 'enter' key in column title", async () => {
			setup({ isEditMode: true, scope: "column" });
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			textAreaComponent.vm.$emit(
				"keydown",
				new KeyboardEvent("keydown", {
					key: "Enter",
				})
			);
			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toBe(undefined);
		});
	});
});
