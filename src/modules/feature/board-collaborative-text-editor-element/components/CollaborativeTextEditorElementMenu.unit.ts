import CollaborativeTextEditorElementMenu from "./CollaborativeTextEditorElementMenu.vue";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";

// Mocks
vi.mock("@ui-confirmation-dialog");

const mockedUseDeleteConfirmationDialog = vi.mocked(useDeleteConfirmationDialog);

describe("CollaborativeTextEditorElementMenu", () => {
	const getWrapper = (propsData: {
		isNotFirstElement: boolean;
		isNotLastElement: boolean;
		hasMultipleElements: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
	}) => {
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
		vi.resetAllMocks();
	});

	const setup = () => {
		const { wrapper } = getWrapper({
			hasMultipleElements: true,
			isNotFirstElement: true,
			isNotLastElement: true,
			columnIndex: 0,
			rowIndex: 1,
			elementIndex: 2,
		});

		return {
			wrapper,
		};
	};

	describe("Move Up Button", () => {
		it("should have a menu option to move element up", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-up event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

			await menuItem.trigger("click");

			expect(wrapper.emitted("move-up:element")).toBeDefined();
		});
	});

	describe("Move Down Button", () => {
		it("should have a menu option to move element down", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the move-down event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);

			await menuItem.trigger("click");

			expect(wrapper.emitted("move-down:element")).toBeDefined();
		});
	});

	describe("Delete Button", () => {
		it("should have a menu option to delete", () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			expect(menuItem.exists()).toEqual(true);
		});

		it("should emit the delete event on click", async () => {
			const { wrapper } = setup();

			const menuItem = wrapper.findComponent(KebabMenuActionDelete);

			menuItem.vm.$emit("click", Promise.resolve(true));
			await nextTick();

			expect(wrapper.emitted("delete:element")).toBeDefined();
		});
	});
});
