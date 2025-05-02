import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import BoardAnyTitleInput from "./BoardAnyTitleInput.vue";
import { VTextarea } from "vuetify/lib/components/index.mjs";

jest.mock("@util-board");

const defaultProps = {
	value: "props value",
	isEditMode: true,
	scope: "card",
	emptyValueFallback: "",
	isFocused: false,
};

describe("BoardAnyTitleInput", () => {
	const setup = (props: {
		isEditMode: boolean;
		scope: "card" | "column" | "board";
		emptyValueFallback?: string;
		isFocused?: boolean;
		maxLength?: number;
	}) => {
		const wrapper = mount(BoardAnyTitleInput, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				...defaultProps,
				...props,
			},
		});

		return { wrapper };
	};

	it("should be found in dom", () => {
		const { wrapper } = setup({ isEditMode: false, scope: "card" });
		expect(wrapper.exists()).toBe(true);
	});

	describe("when component is in edit mode", () => {
		it("should display textarea", () => {
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const textAreaComponent = wrapper.findComponent(VTextarea);

			expect(textAreaComponent.exists()).toBe(true);
		});

		it("should not display heading", () => {
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const heading = wrapper.find("h1");

			expect(heading.exists()).toBe(false);
		});

		it("should forward maxLength prop to VTextarea", () => {
			const { wrapper } = setup({
				isEditMode: true,
				scope: "board",
				maxLength: 10,
			});

			const textAreaComponent = wrapper.findComponent(VTextarea);
			const textarea = textAreaComponent.find("textarea");
			const maxLength = textarea.attributes("maxlength");

			expect(maxLength).toBe("10");
		});

		it("should emit enter on hitting 'enter' key in card title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const textAreaComponent = wrapper.findComponent(VTextarea);
			await textAreaComponent.trigger("keydown.enter");

			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("should emit enter on hitting 'enter' key in column title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "column" });
			const textAreaComponent = wrapper.findComponent(VTextarea);
			await textAreaComponent.trigger("keydown.enter");

			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("should emit enter on hitting 'enter' key in board title", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "board" });
			const textFieldComponent = wrapper.findComponent(VTextarea);
			await textFieldComponent.trigger("keydown.enter");

			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});

		it("updates modalValue when prop value changes", async () => {
			const { wrapper } = setup({ isEditMode: true, scope: "card" });
			const newValue = "new title";
			await wrapper.setProps({ value: newValue });
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.modelValue).toBe(newValue);
		});
	});

	describe("when component is not in edit mode", () => {
		it("should display h1 with board title class when scope is board", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "board" });
			const heading = wrapper.find("h1");

			expect(heading.exists()).toBe(true);
			expect(heading.attributes("class")).toContain("board-title");
		});

		it("should display VTextarea when scope is column", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "column" });
			const heading = wrapper.find("h2");

			expect(heading.exists()).toBe(true);
			expect(heading.attributes("class")).toContain("other-title");
		});

		it("should display h2 when scope is card", () => {
			const { wrapper } = setup({ isEditMode: false, scope: "card" });
			const heading = wrapper.find("h3");

			expect(heading.exists()).toBe(true);
			expect(heading.attributes("class")).toContain("other-title");
		});

		it("should display correct title when textarea value changes", async () => {
			const { wrapper } = setup({
				isEditMode: true,
				scope: "board",
			});
			const newTitle = "New Title";

			const textFieldComponent = wrapper.findComponent(VTextarea);
			await textFieldComponent.setValue(newTitle);

			await wrapper.setProps({ isEditMode: false });
			const heading = wrapper.find("h1");

			expect(heading.text()).toBe(newTitle);
		});

		it("should display fallback title when textarea value is empty", async () => {
			const emptyValueFallback = "Fallback Title";
			const { wrapper } = setup({
				isEditMode: true,
				scope: "board",
				emptyValueFallback,
			});

			const textFieldComponent = wrapper.findComponent(VTextarea);
			await textFieldComponent.setValue("");

			await wrapper.setProps({ isEditMode: false });
			const heading = wrapper.find("h1");

			expect(heading.text()).toBe(emptyValueFallback);
		});
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		describe("when scope is board", () => {
			it("should display error message", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "board" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");

				expect(wrapper.text()).toContain(
					"common.validation.containsOpeningTag"
				);
			});

			it("should not emit update:value", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "board" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				const emitted = wrapper.emitted();

				expect(emitted["update:value"]).toBeUndefined();
			});
		});

		describe("when scope is card", () => {
			it("should display error message", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");

				expect(wrapper.text()).toContain(
					"common.validation.containsOpeningTag"
				);
			});

			it("should not emit update:value", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "card" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				const emitted = wrapper.emitted();

				expect(emitted["update:value"]).toBeUndefined();
			});
		});

		describe("when scope is column", () => {
			it("should display error message", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "column" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");

				expect(wrapper.text()).toContain(
					"common.validation.containsOpeningTag"
				);
			});

			it("should not emit update:value", async () => {
				const { wrapper } = setup({ isEditMode: true, scope: "column" });

				const textAreaComponent = wrapper.findComponent(VTextarea);
				await textAreaComponent.setValue("<abc123");
				const emitted = wrapper.emitted();

				expect(emitted["update:value"]).toBeUndefined();
			});
		});
	});
});
