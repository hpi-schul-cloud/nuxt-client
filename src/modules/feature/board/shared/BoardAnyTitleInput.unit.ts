import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardPermissions } from "@data-board";
import { mount } from "@vue/test-utils";
import BoardAnyTitleInput from "./BoardAnyTitleInput.vue";

jest.mock("./InlineEditInteractionHandler.composable");

jest.mock("@data-board/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const defaultProps = {
	value: "props value",
	isEditMode: true,
	scope: "card",
	placeholder: "placeholder-text",
	isFocused: false,
};

describe("BoardAnyTitleTitleInput", () => {
	let wrapper: ReturnType<typeof mount>;

	const setup = (
		props: {
			isEditMode: boolean;
			scope: "card" | "column" | "board";
			placeholder?: string;
			isFocused?: boolean;
			maxLength?: number;
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

		wrapper = mount(BoardAnyTitleInput, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					CARD_HOST_INTERACTION_EVENT: undefined,
				},
			},
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

		it("should forward maxLength prop to VTextarea", () => {
			setup({ isEditMode: false, scope: "board", maxLength: 10 });
			const inputs = wrapper.findAll("input");
			const maxLength = inputs[0].element.getAttribute("maxlength");
			expect(maxLength).toBe("10");
		});

		it("should emit if value changes", async () => {
			setup({ isEditMode: true, scope: "card" });
			const newValue = "new title";
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			textAreaComponent.vm.$emit("update:modelValue", "new title");
			const emitted = wrapper.emitted();

			if (emitted["update:value"] === undefined) {
				throw new Error("Emitted should be defined");
			}

			expect(emitted["update:value"][0]).toContain(newValue);
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

		it("should emit enter on hitting 'enter' key in column title", async () => {
			setup({ isEditMode: true, scope: "column" });
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

		it("should emit enter on hitting 'enter' key in board title", async () => {
			setup({ isEditMode: true, scope: "board" });
			const textFieldComponent = wrapper.findComponent({ name: "VTextField" });
			textFieldComponent.vm.$emit(
				"keydown",
				new KeyboardEvent("keydown", {
					key: "Enter",
				})
			);
			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("should display VTextField when scope is board", () => {
			setup({ isEditMode: true, scope: "board" });
			const textFieldComponent = wrapper.findComponent({ name: "VTextField" });
			expect(textFieldComponent.exists()).toBe(true);
		});

		it("should display VTextarea when scope is card", () => {
			setup({ isEditMode: true, scope: "card" });
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			expect(textAreaComponent.exists()).toBe(true);
		});

		it("should display VTextarea when scope is column", () => {
			setup({ isEditMode: true, scope: "column" });
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			expect(textAreaComponent.exists()).toBe(true);
		});
	});
});
