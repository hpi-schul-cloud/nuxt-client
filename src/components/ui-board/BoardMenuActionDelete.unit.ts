import { BoardMenuScope } from "@/components/ui-board/board-menu-scope";
import { MENU_SCOPE } from "@/components/ui-board/injection-tokens";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { BoardMenuActionDelete } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { nextTick, ref } from "vue";
import BoardMenuAction from "./BoardMenuAction.vue";

jest.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = jest.mocked(
	useDeleteConfirmationDialog
);

describe("BoardMenuActionMoveDown Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: { scope: BoardMenuScope }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardMenuActionDelete as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				[MENU_SCOPE as symbol]: options.scope,
			},
		});
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
			setup({ scope: "board" });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeTruthy();
		});

		it("should open askConfirmationDialog on click", () => {
			setup({ scope: "board" });
			const action = wrapper.findComponent(BoardMenuAction);
			action.vm.$emit("click");
			expect(askDeleteConfirmationMock).toHaveBeenCalled();
		});

		it("should emit click on taskConfirmationDialog confirmation", async () => {
			setup({ scope: "board" });
			askDeleteConfirmationMock.mockResolvedValue(true);
			const action = wrapper.findComponent(BoardMenuAction);
			await action.vm.$emit("click");
			await nextTick();
			expect(wrapper.emitted("click")).toBeTruthy();
		});

		it("should not emit click on taskConfirmationDialog cancel", async () => {
			setup({ scope: "board" });
			askDeleteConfirmationMock.mockResolvedValue(false);
			const action = wrapper.findComponent(BoardMenuAction);
			await action.vm.$emit("click");
			await nextTick();
			expect(wrapper.emitted("click")).toBeFalsy();
		});
	});
});
