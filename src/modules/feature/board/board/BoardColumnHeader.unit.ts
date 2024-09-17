import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import {
	BoardAnyTitleInput,
	BoardMenuActionMoveColumnDown,
	BoardMenuActionMoveColumnUp,
	BoardMenuActionMoveLeft,
	BoardMenuActionMoveRight,
} from "@ui-board";
import { useCourseBoardEditMode } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { computed } from "vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";

jest.mock("@data-board");
jest.mock("@util-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

describe("BoardColumnHeader", () => {
	const mockedUseEditMode = jest.mocked(useCourseBoardEditMode);

	const setup = (
		options?: {
			permissions?: Partial<BoardPermissionChecks>;
		},
		props?: object
	) => {
		const isEditMode = computed(() => true);
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: jest.fn(),
			stopEditMode: jest.fn(),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		mockUseBoardFocusHandler.mockReturnValue({
			isFocusContained: undefined,
		});

		const wrapper = shallowMount(BoardColumnHeader, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			propsData: {
				title: "title-text",
				titlePlaceholder: "Spalte 1",
				columnId: "abc123",
				...props,
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const wrapper = setup();
			expect(wrapper.findComponent(BoardColumnHeader).exists()).toBe(true);
		});
	});

	describe("when the title updated", () => {
		it("should emit 'update:title'", () => {
			const wrapper = setup();

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value");

			const emitted = wrapper.emitted();
			expect(emitted["update:title"]).toBeDefined();
		});
	});

	describe("when the board is of type list", () => {
		it("should not show options to move left and right", async () => {
			const wrapper = setup({}, { isListBoard: true });

			const moveLeftButton = wrapper.findComponent(BoardMenuActionMoveLeft);
			const moveRightButton = wrapper.findComponent(BoardMenuActionMoveRight);
			expect(moveLeftButton.exists()).toBe(false);
			expect(moveRightButton.exists()).toBe(false);
		});

		describe("when the column should be moved down", () => {
			it("should emit move:column-down", async () => {
				const wrapper = setup({}, { isListBoard: true });

				const moveDownButton = wrapper.findComponent(
					BoardMenuActionMoveColumnDown
				);
				moveDownButton.vm.$emit("click");

				const emitted = wrapper.emitted();
				expect(emitted["move:column-down"]).toBeDefined();
			});
		});

		describe("when the column should be moved up", () => {
			it("should emit move:column-up", async () => {
				const wrapper = setup({}, { isListBoard: true });

				const moveUpButton = wrapper.findComponent(BoardMenuActionMoveColumnUp);
				moveUpButton.vm.$emit("click");

				const emitted = wrapper.emitted();
				expect(emitted["move:column-up"]).toBeDefined();
			});
		});
	});

	describe("when the board is of type column", () => {
		it("should not show options to move up and down", async () => {
			const wrapper = setup({}, { isListBoard: false });

			const moveDownButton = wrapper.findComponent(
				BoardMenuActionMoveColumnDown
			);
			const moveUpButton = wrapper.findComponent(BoardMenuActionMoveColumnUp);
			expect(moveDownButton.exists()).toBe(false);
			expect(moveUpButton.exists()).toBe(false);
		});

		describe("when the column should be moved to the left", () => {
			it("should emit move:column-left", async () => {
				const wrapper = setup({}, { isListBoard: false });

				const moveLeftButton = wrapper.findComponent(BoardMenuActionMoveLeft);
				moveLeftButton.vm.$emit("click");

				const emitted = wrapper.emitted();
				expect(emitted["move:column-left"]).toBeDefined();
			});
		});

		describe("when the column should be moved to the right", () => {
			it("should emit move:column-right", async () => {
				const wrapper = setup({}, { isListBoard: false });

				const moveRightButton = wrapper.findComponent(BoardMenuActionMoveRight);
				moveRightButton.vm.$emit("click");

				const emitted = wrapper.emitted();
				expect(emitted["move:column-right"]).toBeDefined();
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete a column", () => {
			it("should not be rendered on DOM", () => {
				const wrapper = setup({
					permissions: { hasDeletePermission: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});
});
