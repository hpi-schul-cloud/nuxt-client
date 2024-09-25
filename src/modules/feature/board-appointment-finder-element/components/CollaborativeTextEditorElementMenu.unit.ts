import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { shallowMount } from "@vue/test-utils";
import { ref } from "vue";
import CollaborativeTextEditorElementMenu from "./CollaborativeTextEditorElementMenu.vue";

// Mocks
jest.mock("@ui-confirmation-dialog");

const mockedUseDeleteConfirmationDialog = jest.mocked(
	useDeleteConfirmationDialog
);

describe("CollaborativeTextEditorElementMenu", () => {
	const getWrapper = (propsData: {
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const askDeleteConfirmationMock = async () => await Promise.resolve(true);

		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		const wrapper = shallowMount(CollaborativeTextEditorElementMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: propsData,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	const setup = () => {
		const { wrapper } = getWrapper({
			hasMultipleElements: true,
			isFirstElement: false,
			isLastElement: false,
		});

		return {
			wrapper,
		};
	};

	describe("Move Up Button", () => {
		it("should have a menu option to move element up", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionMoveUp);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-up event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionMoveUp);

			await menuItem.trigger("click");

			expect(wrapper.emitted("move-up:element")).toBeDefined();
		});
	});

	describe("Move Down Button", () => {
		it("should have a menu option to move element down", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionMoveDown);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-down event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionMoveDown);

			await menuItem.trigger("click");

			expect(wrapper.emitted("move-down:element")).toBeDefined();
		});
	});

	describe("Delete Button", () => {
		it("should have a menu option to delete", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(BoardMenuActionDelete);

			await menuItem.trigger("click");

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
