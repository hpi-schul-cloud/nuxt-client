import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE } from "./injection-tokens";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionDelete } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import BoardMenuAction from "./BoardMenuAction.vue";

jest.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = jest.mocked(
	useDeleteConfirmationDialog
);

describe("BoardMenuActionMoveDown Component", () => {
	const setup = (options: { scope: BoardMenuScope }) => {
		const wrapper = mount(BoardMenuActionDelete, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[MENU_SCOPE as symbol]: options.scope,
				},
			},
		});

		return wrapper;
	};

	const askDeleteConfirmationMock = jest.fn();

	setupDeleteConfirmationComposableMock({
		askDeleteConfirmationMock,
	});

	mockedUseDeleteConfirmationDialog.mockReturnValue({
		askDeleteConfirmation: askDeleteConfirmationMock,
		isDeleteDialogOpen: ref(false),
	});

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup({ scope: "board" });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should open askConfirmationDialog on click", () => {
			const wrapper = setup({ scope: "board" });
			const action = wrapper.findComponent(BoardMenuAction);
			action.vm.$emit("click");
			expect(askDeleteConfirmationMock).toHaveBeenCalled();
		});

		it("should emit click on taskConfirmationDialog confirmation (its a Promise)", async () => {
			const wrapper = setup({ scope: "board" });
			askDeleteConfirmationMock.mockResolvedValue(true);
			const action = wrapper.findComponent(BoardMenuAction);
			await action.vm.$emit("click");
			await nextTick();
			expect(wrapper.emitted("click")).toBeTruthy();
		});

		it("should emit click on taskConfirmationDialog cancel, too (its a Promise)", async () => {
			const wrapper = setup({ scope: "board" });
			askDeleteConfirmationMock.mockResolvedValue(false);
			const action = wrapper.findComponent(BoardMenuAction);
			await action.vm.$emit("click");
			await nextTick();
			expect(wrapper.emitted()).toBeTruthy();
		});
	});
});
