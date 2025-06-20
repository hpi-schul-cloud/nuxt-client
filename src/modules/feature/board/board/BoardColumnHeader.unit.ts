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
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
	KebabMenuActionMoveLeft,
	KebabMenuActionMoveRight,
	KebabMenuActionDelete,
	KebabMenuActionRename,
} from "@ui-kebab-menu";
import { useCourseBoardEditMode } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import { BoardColumnInteractionHandler } from "@feature-board";

vi.mock("@data-board");
vi.mock("@util-board");
const mockedUserPermissions = vi.mocked(useBoardPermissions);
const mockUseBoardFocusHandler = vi.mocked(useBoardFocusHandler);

describe("BoardColumnHeader", () => {
	const mockedUseEditMode = vi.mocked(useCourseBoardEditMode);
	const mockedStartEditMode = vi.fn();
	const mockedStopEditMode = vi.fn();

	const setup = (
		options: {
			permissions?: Partial<BoardPermissionChecks>;
			isEditMode?: boolean;
		} = {},
		props?: object
	) => {
		const isEditMode = computed(() => options.isEditMode ?? true);

		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: mockedStartEditMode,
			stopEditMode: mockedStopEditMode,
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
				isListBoard: false,
				index: 0,
				...props,
			},
		});
		return wrapper;
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

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

			const moveLeftButton = wrapper.findComponent(KebabMenuActionMoveLeft);
			const moveRightButton = wrapper.findComponent(KebabMenuActionMoveRight);
			expect(moveLeftButton.exists()).toBe(false);
			expect(moveRightButton.exists()).toBe(false);
		});

		describe("when the column should be moved down", () => {
			describe("when the column is the last column", () => {
				it("should hide move:column-down menut item", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: true, isNotLastColumn: false }
					);

					const moveDownButton = wrapper.findComponent(KebabMenuActionMoveDown);

					expect(moveDownButton.exists()).toBe(false);
				});
			});

			describe("when the column is not the last column", () => {
				it("should emit move:column-down", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: true, isNotLastColumn: true }
					);

					const moveDownButton = wrapper.findComponent(KebabMenuActionMoveDown);
					moveDownButton.vm.$emit("click");

					const emitted = wrapper.emitted();
					expect(emitted["move:column-down"]).toBeDefined();
				});
			});
		});

		describe("when the column should be moved up", () => {
			describe("when the column is the first column", () => {
				it("should hide move:column-up menu item", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: true, isNotFirstColumn: false }
					);

					const moveUpButton = wrapper.findComponent(KebabMenuActionMoveUp);

					expect(moveUpButton.exists()).toBe(false);
				});
			});

			describe("when the column is not the first column", () => {
				it("should emit move:column-up", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: true, isNotFirstColumn: true }
					);

					const moveUpButton = wrapper.findComponent(KebabMenuActionMoveUp);
					moveUpButton.vm.$emit("click");

					const emitted = wrapper.emitted();
					expect(emitted["move:column-up"]).toBeDefined();
				});
			});
		});

		describe("when move-column-keyboard-event is received", () => {
			describe("when arrow-up-key is received", () => {
				it("should emit move:column-left", () => {
					const wrapper = setup(
						{ permissions: { hasDeletePermission: ref(true) } },
						{ isListBoard: true }
					);

					const interactionHandler = wrapper.findComponent(
						BoardColumnInteractionHandler
					);
					interactionHandler.vm.$emit("move:column-keyboard", {
						code: "ArrowUp",
					});

					const emitted = wrapper.emitted();
					expect(emitted["move:column-left"]).toBeDefined();
				});
			});

			describe("when arrow-right-key is received", () => {
				it("should emit move:column-left", () => {
					const wrapper = setup(
						{ permissions: { hasDeletePermission: ref(true) } },
						{ isListBoard: true }
					);

					const interactionHandler = wrapper.findComponent(
						BoardColumnInteractionHandler
					);
					interactionHandler.vm.$emit("move:column-keyboard", {
						code: "ArrowDown",
					});

					const emitted = wrapper.emitted();
					expect(emitted["move:column-right"]).toBeDefined();
				});
			});
		});
	});

	describe("when the board is of type column", () => {
		it("should not show options to move up and down", async () => {
			const wrapper = setup({}, { isListBoard: false });

			const moveDownButton = wrapper.findComponent(KebabMenuActionMoveDown);
			const moveUpButton = wrapper.findComponent(KebabMenuActionMoveUp);
			expect(moveDownButton.exists()).toBe(false);
			expect(moveUpButton.exists()).toBe(false);
		});

		describe("when the column should be moved to the left", () => {
			describe("when the column is the first column", () => {
				it("should hide move:column-left menuitem", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: false, isNotFirstColumn: false }
					);

					const moveLeftButton = wrapper.findComponent(KebabMenuActionMoveLeft);

					expect(moveLeftButton.exists()).toBe(false);
				});
			});

			describe("when the column is not the first column", () => {
				it("should emit move:column-left", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: false, isNotFirstColumn: true }
					);

					const moveLeftButton = wrapper.findComponent(KebabMenuActionMoveLeft);
					moveLeftButton.vm.$emit("click");

					const emitted = wrapper.emitted();
					expect(emitted["move:column-left"]).toBeDefined();
				});
			});
		});

		describe("when the column should be moved to the right", () => {
			describe("when the column is the last column", () => {
				it("should hide move:column-right menu item", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: false, isNotLastColumn: false }
					);

					const moveRightButton = wrapper.findComponent(
						KebabMenuActionMoveRight
					);

					expect(moveRightButton.exists()).toBe(false);
				});
			});

			describe("when the column is not the last column", () => {
				it("should emit move:column-right", async () => {
					const wrapper = setup(
						{},
						{ isListBoard: false, isNotLastColumn: true }
					);

					const moveRightButton = wrapper.findComponent(
						KebabMenuActionMoveRight
					);
					moveRightButton.vm.$emit("click");

					const emitted = wrapper.emitted();
					expect(emitted["move:column-right"]).toBeDefined();
				});
			});
		});

		describe("when move-column-keyboard-event is received", () => {
			describe("when arrow-left-key is received", () => {
				it("should emit move:column-left", () => {
					const wrapper = setup({
						isEditMode: false,
						permissions: { hasDeletePermission: ref(true) },
					});

					const interactionHandler = wrapper.findComponent(
						BoardColumnInteractionHandler
					);
					interactionHandler.vm.$emit("move:column-keyboard", {
						code: "ArrowLeft",
					});

					const emitted = wrapper.emitted();
					expect(emitted["move:column-left"]).toBeDefined();
				});
			});

			describe("when arrow-right-key is received", () => {
				it("should emit move:column-left", () => {
					const wrapper = setup({
						isEditMode: false,
						permissions: { hasDeletePermission: ref(true) },
					});

					const interactionHandler = wrapper.findComponent(
						BoardColumnInteractionHandler
					);
					interactionHandler.vm.$emit("move:column-keyboard", {
						code: "ArrowRight",
					});

					const emitted = wrapper.emitted();
					expect(emitted["move:column-right"]).toBeDefined();
				});
			});
		});
	});

	describe("when rename button is clicked", () => {
		it("should start the edit mode", () => {
			const wrapper = setup({
				isEditMode: false,
				permissions: { hasDeletePermission: ref(true) },
			});

			const action = wrapper.findComponent(KebabMenuActionRename);
			action.trigger("click");

			expect(mockedStartEditMode).toHaveBeenCalled();
		});
	});

	describe("when end-edit-mode event is received", () => {
		it("should stop the edit mode", () => {
			const wrapper = setup({
				isEditMode: false,
				permissions: { hasDeletePermission: ref(true) },
			});

			const interactionHandler = wrapper.findComponent(
				BoardColumnInteractionHandler
			);
			interactionHandler.vm.$emit("end-edit-mode");

			expect(mockedStopEditMode).toHaveBeenCalled();
		});
	});

	describe("when delete button is clicked", () => {
		describe("when delete is confirmed", () => {
			it("should emit delete:column", async () => {
				const wrapper = setup({
					isEditMode: false,
					permissions: { hasDeletePermission: ref(true) },
				});

				const deleteAction = wrapper.findComponent(KebabMenuActionDelete);
				deleteAction.vm.$emit("click", true);
				await nextTick();

				const emitted = wrapper.emitted();
				expect(emitted["delete:column"]).toBeDefined();
			});
		});

		describe("when delete is refused", () => {
			it("should emit delete:column", async () => {
				const wrapper = setup({
					isEditMode: false,
					permissions: { hasDeletePermission: ref(true) },
				});

				const deleteAction = wrapper.findComponent(KebabMenuActionDelete);
				deleteAction.vm.$emit("click", false);
				await nextTick();

				const emitted = wrapper.emitted();
				expect(emitted["delete:column"]).not.toBeDefined();
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete a column", () => {
			it("should not be rendered on DOM", () => {
				const wrapper = setup({
					permissions: { hasDeletePermission: ref(false) },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});
});
