import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount, VueWrapper } from "@vue/test-utils";
import BoardAnyTitleInput from "./BoardAnyTitleInput.vue";

jest.mock("@util-board");

const defaultProps = {
	value: "props value",
	isEditMode: true,
	scope: "card",
	placeholder: "placeholder-text",
	isFocused: false,
};

describe("BoardAnyTitleTitleInput", () => {
	const setup = (props: {
		isEditMode: boolean;
		scope: "card" | "column" | "board";
		placeholder?: string;
		isFocused?: boolean;
		maxLength?: number;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = mount(BoardAnyTitleInput, {
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

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "card" });
			expect(wrapper).toBeDefined();
		});

		it("should forward maxLength prop to VTextarea", () => {
			const { wrapper } = setup({
				isEditMode: false,
				scope: "board",
				maxLength: 10,
			});
			const inputs = wrapper.findAll("input");
			const maxLength = inputs[0].element.getAttribute("maxlength");
			expect(maxLength).toBe("10");
		});

		it("should emit if value changes", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const newValue = "new title";
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			await textAreaComponent.setValue("new title");
			const emitted = wrapper.emitted();

			if (emitted["update:value"] === undefined) {
				throw new Error("Emitted should be defined");
			}

			expect(emitted["update:value"][0]).toContain(newValue);
		});

		it("should emit enter on hitting 'enter' key in card title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
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
			const { wrapper } = setup({ isEditMode: true, scope: "column" });
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
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
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
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const textFieldComponent = wrapper.findComponent({ name: "VTextField" });
			expect(textFieldComponent.exists()).toBe(true);
		});

		it("should display VTextarea when scope is card", () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			expect(textAreaComponent.exists()).toBe(true);
		});

		it("should display VTextarea when scope is column", () => {
			const { wrapper } = setup({ isEditMode: true, scope: "column" });
			const textAreaComponent = wrapper.findComponent({ name: "VTextarea" });
			expect(textAreaComponent.exists()).toBe(true);
		});

		it("updates modalValue when prop value changes", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const newValue = "new title";
			await wrapper.setProps({ value: newValue });
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.modelValue).toBe(newValue);
		});
	});
});
