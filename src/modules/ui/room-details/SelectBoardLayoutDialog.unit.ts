import { BoardLayout } from "@/serverApi/v3";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import SelectBoardLayoutDialog from "./SelectBoardLayoutDialog.vue";

describe("@ui-room-details/SelectBoardLayoutDialog", () => {
	const setup = (currentLayout?: BoardLayout) => {
		const wrapper = mount(SelectBoardLayoutDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
				renderStubDefaultSlot: true,
			},
			props: {
				modelValue: true,
				currentLayout,
			},
		});

		return { wrapper };
	};

	it("should be rendered correctly", async () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("when selecting multi column board", () => {
		it("should emit correct event", async () => {
			const { wrapper } = setup();

			const multiColumnButton = wrapper.findComponent(
				"[data-testid=dialog-add-multi-column-board]"
			);
			await multiColumnButton.trigger("click");

			expect(wrapper.emitted("select")).toEqual([[BoardLayout.Columns]]);
		});
	});

	describe("when selecting single column board", () => {
		it("should emit correct event", async () => {
			const { wrapper } = setup();

			const multiColumnButton = wrapper.findComponent(
				"[data-testid=dialog-add-single-column-board]"
			);
			await multiColumnButton.trigger("click");

			expect(wrapper.emitted("select")).toEqual([[BoardLayout.List]]);
		});
	});

	describe("when clicking the close button", () => {
		it("should close the dialog", async () => {
			const { wrapper } = setup();

			const closeBtn = wrapper.findComponent("[data-testid=dialog-close]");
			await closeBtn.trigger("click");

			expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
		});
	});

	describe("when a board layout is changed", () => {
		it("should highlight the currently selected option", async () => {
			const { wrapper } = setup(BoardLayout.Columns);

			const multiColumnButton = wrapper.findComponent(
				"[data-testid=dialog-add-multi-column-board]"
			);

			expect(multiColumnButton.classes()).toContain("selected");
		});
	});
});
