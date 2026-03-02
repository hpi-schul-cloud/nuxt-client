import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardHeader from "./BoardHeader.vue";
import KebabMenuActionEditingSettings from "./KebabMenuActionEditingSettings.vue";
import { BoardExternalReferenceType, BoardResponseAllowedOperations, ConfigResponse } from "@/serverApi/v3";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useCourseBoardEditMode, useSharedEditMode } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import {
	KebabMenuActionChangeLayout,
	KebabMenuActionDelete,
	KebabMenuActionDuplicate,
	KebabMenuActionPublish,
	KebabMenuActionRename,
	KebabMenuActionRevert,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";

vi.mock("@data-board/BoardFocusHandler.composable");
const mockUseBoardFocusHandler = vi.mocked(useBoardFocusHandler);

vi.mock("@data-board/edit-mode.composable");
const mockedUseSharedEditMode = vi.mocked(useSharedEditMode);
const mockedUseEditMode = vi.mocked(useCourseBoardEditMode);
mockedUseSharedEditMode.mockReturnValue({
	editModeId: ref(undefined),
	setEditModeId: vi.fn(),
	isInEditMode: computed(() => true),
});

describe("BoardHeader", () => {
	const setup = (
		options?: {
			envs?: Partial<ConfigResponse>;
			allowedOperations?: Partial<BoardResponseAllowedOperations>;
		},
		props?: {
			isDraft?: boolean;
			hasReadersEditPermission?: boolean;
			boardContextType?: BoardExternalReferenceType;
			isEditMode?: boolean;
		}
	) => {
		const isEditMode = computed(() => props?.isEditMode ?? true);
		const startEditMode = vi.fn();
		const stopEditMode = vi.fn();
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode,
			stopEditMode,
		});
		mockUseBoardFocusHandler.mockReturnValue({
			isFocusContained: undefined,
		});

		setActivePinia(createTestingPinia());
		createTestEnvStore(options?.envs);

		const wrapper = shallowMount(BoardHeader, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							boardStore: {
								board: {
									allowedOperations: options?.allowedOperations,
								},
							},
						},
					}),
				],
				stubs: {
					VTooltip: false,
					VOverlay: false,
				},
			},
			props: {
				title: "title-text",
				titlePlaceholder: "Board 1",
				boardId: "abc123",
				isDraft: props?.isDraft ?? false,
				isEditableChipVisible: true,
				hasReadersEditPermission: props?.hasReadersEditPermission || false,
				boardContextType: BoardExternalReferenceType.Room,
				...props,
			},
		});
		return { startEditMode, stopEditMode, wrapper };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardHeader).exists()).toBe(true);
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to edit the board title", () => {
			it("should not find the BoardMenu in the DOM", () => {
				const { wrapper } = setup({
					allowedOperations: { updateBoardTitle: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});

		describe("when user is permitted to edit the board", () => {
			it("should find the BoardMenu in the DOM", () => {
				const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(1);
			});

			it("should enable copying", () => {
				const { wrapper } = setup({
					envs: { FEATURE_COLUMN_BOARD_SHARE: true },
					allowedOperations: { updateBoardTitle: true, shareBoard: true },
				});

				const shareButton = wrapper.findComponent(KebabMenuActionShare);

				expect(shareButton.exists()).toBe(true);
			});

			it("should enable sharing with feature flag", () => {
				const { wrapper } = setup({
					envs: { FEATURE_COLUMN_BOARD_SHARE: true },
					allowedOperations: { updateBoardTitle: true, shareBoard: true },
				});

				const shareButton = wrapper.findComponent(KebabMenuActionShare);

				expect(shareButton.exists()).toBe(true);
			});

			it("should disable sharing with feature flag", () => {
				const { wrapper } = setup({
					envs: { FEATURE_COLUMN_BOARD_SHARE: false },
				});

				const shareButton = wrapper.findComponent(KebabMenuActionShare);

				expect(shareButton.exists()).toBe(false);
			});
		});
	});

	describe("when the 'edit' menu button is clicked", () => {
		it("should call startEditMode", async () => {
			const { startEditMode, wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

			const editButton = wrapper.findComponent(KebabMenuActionRename);
			await editButton.trigger("click");

			expect(startEditMode).toHaveBeenCalled();
		});
	});

	describe("when the title is updated", () => {
		describe("when the title is empty", () => {
			it("should not emit 'update:title'", () => {
				vi.useFakeTimers();

				const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "");

				vi.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeUndefined();
			});
		});

		describe("when the title is not empty", () => {
			it("should emit 'update:title'", () => {
				vi.useFakeTimers();

				const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "new-title");

				vi.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeDefined();
			});
		});
	});

	describe("when the user presses enter key", () => {
		describe("when the title is in edit mode", () => {
			it("should exit edit mode", async () => {
				vi.useFakeTimers();

				const { startEditMode, stopEditMode, wrapper } = setup({}, { isEditMode: true });

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				await titleInput.trigger("keydown.enter");

				vi.runAllTimers();

				expect(startEditMode).not.toHaveBeenCalled();
				expect(stopEditMode).toHaveBeenCalled();
			});
		});

		describe("when the title is not in edit mode", () => {
			it("should start edit mode", async () => {
				vi.useFakeTimers();

				const { startEditMode, stopEditMode, wrapper } = setup({}, { isEditMode: false });

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				await titleInput.trigger("keydown.enter");

				vi.runAllTimers();

				expect(startEditMode).toHaveBeenCalled();
				expect(stopEditMode).not.toHaveBeenCalled();
			});
		});
	});

	describe("when the title loses focus", () => {
		describe("when the title is empty", () => {
			it("should emit 'update:title'", () => {
				vi.useFakeTimers();

				const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "");
				titleInput.vm.$emit("blur");

				vi.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeDefined();
				expect(emitted?.[0][0]).toEqual("Common.words.board");
			});
		});

		describe("when the title is not empty", () => {
			it("should not emit 'update:title'", () => {
				vi.useFakeTimers();

				const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "newTitle");
				titleInput.vm.$emit("blur");

				vi.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted?.[1]).toBeUndefined();
			});
		});
	});

	describe("when the 'copy' menu button is clicked", () => {
		it("should emit 'copy:board'", async () => {
			const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true, copyBoard: true } });

			const duplicateButton = wrapper.findComponent(KebabMenuActionDuplicate);
			await duplicateButton.trigger("click");

			expect(wrapper.emitted("copy:board")).toHaveLength(1);
		});
	});

	describe("when the 'share' menu button is clicked", () => {
		it("should emit 'share:board'", async () => {
			const { wrapper } = setup({
				envs: { FEATURE_COLUMN_BOARD_SHARE: true },
				allowedOperations: { updateBoardTitle: true, shareBoard: true },
			});

			const shareButton = wrapper.findComponent(KebabMenuActionShare);
			await shareButton.trigger("click");

			await flushPromises();

			expect(wrapper.emitted("share:board")).toHaveLength(1);
		});
	});

	describe("when the 'revert' menu button is clicked", () => {
		it("should emit 'revert'", async () => {
			const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } });

			const revertButton = wrapper.findComponent(KebabMenuActionRevert);
			expect(revertButton.exists()).toBe(true);
			await revertButton.trigger("click");

			const emitted = wrapper.emitted("update:visibility");

			expect(emitted).toBeDefined();
			expect(emitted![0]).toStrictEqual([false]);
		});
	});

	describe("when the 'delete' menu button is clicked", () => {
		it("should emit 'delete:board'", async () => {
			const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true, deleteBoard: true } });

			const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
			await deleteButton.trigger("click");

			expect(wrapper.emitted("delete:board")).toHaveLength(1);
		});
	});

	describe("when the 'change layout' menu button is clicked", () => {
		it("should emit 'change-layout'", async () => {
			const { wrapper } = setup({ allowedOperations: { updateBoardLayout: true, updateBoardTitle: true } });

			const changeLayoutButton = wrapper.findComponent(KebabMenuActionChangeLayout);
			await changeLayoutButton.trigger("click");

			await flushPromises();

			expect(wrapper.emitted("change-layout")).toHaveLength(1);
		});
	});

	describe("when board's editable settings are changed", () => {
		it("should emit 'update:editable'", async () => {
			const { wrapper } = setup(
				{ allowedOperations: { updateReadersCanEditSetting: true, updateBoardTitle: true } },
				{ hasReadersEditPermission: true }
			);

			const editableSwitch = wrapper.findComponent(KebabMenuActionEditingSettings);
			await editableSwitch.trigger("click");

			await flushPromises();

			expect(wrapper.emitted("edit:settings")).toHaveLength(1);
		});
	});

	describe("when board is a draft", () => {
		it("should display draft label", () => {
			const { wrapper } = setup({}, { isDraft: true });
			const draftChip = wrapper.find('[data-testid="board-draft-chip"]');

			expect(draftChip.exists()).toBe(true);
		});

		it("should display 'publish' button instead of 'revert' button in menu", () => {
			const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } }, { isDraft: true });

			const revertButton = wrapper.findComponent(KebabMenuActionRevert);
			expect(revertButton.exists()).toBe(false);

			const publishButton = wrapper.findComponent(KebabMenuActionPublish);
			expect(publishButton.exists()).toBe(true);
		});

		describe("when the 'publish' menu button is clicked", () => {
			it("should emit 'publish", async () => {
				const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true } }, { isDraft: true });

				const publishButton = wrapper.findComponent(KebabMenuActionPublish);
				expect(publishButton.exists()).toBe(true);
				await publishButton.trigger("click");

				const emitted = wrapper.emitted("update:visibility");

				expect(emitted).toBeDefined();
				expect(emitted![0]).toStrictEqual([true]);
			});
		});
	});

	describe("when board belongs to a course", () => {
		it("should not display the editable settings button", () => {
			const { wrapper } = setup({}, { boardContextType: BoardExternalReferenceType.Course });

			expect(wrapper.findComponent(KebabMenuActionEditingSettings).exists()).toBe(false);
		});
	});
});
