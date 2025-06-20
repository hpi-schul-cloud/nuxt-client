import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { BoardMenuScope } from "../board/board-menu-scope";
import KebabMenuAction from "./KebabMenuAction.vue";
import KebabMenuActionDelete from "./KebabMenuActionDelete.vue";

vi.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = vi.mocked(
	useDeleteConfirmationDialog
);

describe("KebabMenuActionMoveDown Component", () => {
	const setup = (props: { scope: BoardMenuScope }) => {
		const wrapper = mount(KebabMenuActionDelete, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: props,
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
			const wrapper = setup({ scope: BoardMenuScope.BOARD });
			const action = wrapper.findComponent(KebabMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should open askConfirmationDialog on click", () => {
			const wrapper = setup({ scope: BoardMenuScope.BOARD });

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");

			expect(askDeleteConfirmationMock).toHaveBeenCalled();
		});

		it("should emit click on taskConfirmationDialog confirmation (its a Promise)", async () => {
			const wrapper = setup({ scope: BoardMenuScope.BOARD });
			askDeleteConfirmationMock.mockResolvedValue(true);

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");
			await nextTick();

			expect(wrapper.emitted("click")).toBeTruthy();
		});

		it("should emit click on taskConfirmationDialog cancel, too (its a Promise)", async () => {
			const wrapper = setup({ scope: BoardMenuScope.BOARD });
			askDeleteConfirmationMock.mockResolvedValue(false);

			const action = wrapper.findComponent(KebabMenuAction);
			action.vm.$emit("click");
			await nextTick();

			expect(wrapper.emitted()).toBeTruthy();
		});
	});
});
