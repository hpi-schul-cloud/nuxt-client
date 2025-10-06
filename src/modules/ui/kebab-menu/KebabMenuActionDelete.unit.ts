import KebabMenuAction from "./KebabMenuAction.vue";
import KebabMenuActionDelete from "./KebabMenuActionDelete.vue";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";

vi.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = vi.mocked(useDeleteConfirmationDialog);

describe("KebabMenuActionMoveDown Component", () => {
	const setup = () => {
		const wrapper = mount(KebabMenuActionDelete, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				scopeLanguageKey: "components.board.action.delete",
			},
		});

		return wrapper;
	};

	const askDeleteConfirmationMock = vi.fn();

	setupDeleteConfirmationComposableMock({
		askDeleteConfirmationMock,
	});

	mockedUseDeleteConfirmationDialog.mockReturnValue({
		askDeleteConfirmation: askDeleteConfirmationMock,
		isDeleteDialogOpen: ref(false),
	});

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();
			const action = wrapper.findComponent(KebabMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should render title", async () => {
			const wrapper = setup();

			expect(wrapper.text()).toContain("components.board.action.delete");
		});

		it("should open askConfirmationDialog on click", () => {
			const wrapper = setup();

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");

			expect(askDeleteConfirmationMock).toHaveBeenCalled();
		});

		it("should emit click on taskConfirmationDialog confirmation (its a Promise)", async () => {
			const wrapper = setup();
			askDeleteConfirmationMock.mockResolvedValue(true);

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");
			await nextTick();

			expect(wrapper.emitted("click")).toBeTruthy();
		});

		it("should emit click on taskConfirmationDialog cancel, too (its a Promise)", async () => {
			const wrapper = setup();
			askDeleteConfirmationMock.mockResolvedValue(false);

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");
			await nextTick();

			expect(wrapper.emitted()).toBeTruthy();
		});
	});
});
