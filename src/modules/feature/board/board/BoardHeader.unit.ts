import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import { useBoardScrollMode } from "../shared/BoardScrollMode.composable";
import BoardEditableChip from "./BoardEditableChip.vue";
import BoardHeader from "./BoardHeader.vue";
import KebabMenuActionEditingSettings from "./KebabMenuActionEditingSettings.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardExternalReferenceType, BoardResponseAllowedOperations, ConfigResponse } from "@api-server";
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
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VDivider, VSwitch } from "vuetify/components";

vi.mock("@vueuse/core", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@vueuse/core")>();
	return { ...actual, useScroll: vi.fn() };
});
import { useScroll } from "@vueuse/core";
const mockUseScroll = vi.mocked(useScroll);

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

vi.mock("vue-router");

vi.mock("../shared/BoardScrollMode.composable");
const mockUseBoardScrollMode = vi.mocked(useBoardScrollMode);

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
			isListBoard?: boolean;
			isEditableChipVisible?: boolean;
			title?: string;
		},
		additionalStubs?: Record<string, unknown>
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
		injectRouterMock(createRouterMock());

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
					...additionalStubs,
				},
			},
			props: {
				title: props?.title ?? "title-text",
				titlePlaceholder: "Board 1",
				boardId: "abc123",
				isDraft: props?.isDraft ?? false,
				isEditableChipVisible: props?.isEditableChipVisible ?? true,
				hasReadersEditPermission: props?.hasReadersEditPermission || false,
				boardContextType: BoardExternalReferenceType.ROOM,
				...props,
			},
		});
		return { startEditMode, stopEditMode, wrapper };
	};

	beforeEach(() => {
		mockUseBoardScrollMode.mockReturnValue({
			scrollMode: ref("columns"),
			isPageScrollMode: computed(() => false),
			toggleScrollMode: vi.fn(),
		} as unknown as ReturnType<typeof useBoardScrollMode>);
		mockUseScroll.mockReturnValue({ y: ref(0) } as unknown as ReturnType<typeof useScroll>);
	});

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
			vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
			const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true, deleteBoard: true } });

			const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
			await deleteButton.trigger("click");

			expect(wrapper.emitted("delete:board")).toHaveLength(1);
		});

		it("should not emit 'delete:board' when deletion is cancelled", async () => {
			vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(false);
			const { wrapper } = setup({ allowedOperations: { updateBoardTitle: true, deleteBoard: true } });

			const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
			await deleteButton.trigger("click");
			await nextTick();

			expect(wrapper.emitted("delete:board")).toBeUndefined();
		});
	});

	describe("when the 'change layout' menu button is clicked", () => {
		it("should emit 'change-layout'", async () => {
			const { wrapper } = setup({ allowedOperations: { updateBoardLayout: true, updateBoardTitle: true } });

			const changeLayoutButton = wrapper.findComponent(KebabMenuActionChangeLayout);
			await changeLayoutButton.trigger("click");

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
			const { wrapper } = setup({}, { boardContextType: BoardExternalReferenceType.COURSE });

			expect(wrapper.findComponent(KebabMenuActionEditingSettings).exists()).toBe(false);
		});
	});

	describe("when isEditableChipVisible is false", () => {
		it("should not render the BoardEditableChip", () => {
			const { wrapper } = setup({}, { isEditableChipVisible: false });

			expect(wrapper.findComponent(BoardEditableChip).exists()).toBe(false);
		});
	});

	describe("when calculateWidth is called with a mounted span element", () => {
		it("should use the fallback placeholder when board title is empty", async () => {
			const { wrapper } = setup({}, { title: "" });

			// The inputWidthCalcSpan ref remains null in shallowMount because
			// the span is inside a stubbed component's slot (rendering context lost).
			// Set it manually via Vue's internal setup state.
			const spanEl = document.createElement("span");

			(wrapper.vm as unknown as { $: { setupState: Record<string, unknown> } }).$.setupState["inputWidthCalcSpan"] =
				spanEl;

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value", "");
			await nextTick();

			expect(wrapper.findComponent(BoardHeader).exists()).toBe(true);
		});
	});

	describe("scroll mode toggle", () => {
		const mockToggleScrollMode = vi.fn();

		beforeEach(() => {
			mockUseBoardScrollMode.mockReturnValue({
				scrollMode: ref("columns"),
				isPageScrollMode: computed(() => false),
				toggleScrollMode: mockToggleScrollMode,
			} as unknown as ReturnType<typeof useBoardScrollMode>);
		});

		describe("when isListBoard is false", () => {
			it("should render the scroll mode toggle", () => {
				const { wrapper } = setup({}, { isListBoard: false });

				const toggle = wrapper.find('[data-testid="scroll-mode-toggle-checkbox"]');
				expect(toggle.exists()).toBe(true);
			});
		});

		describe("when isListBoard is true", () => {
			it("should not render the scroll mode toggle", () => {
				const { wrapper } = setup({}, { isListBoard: true });

				const toggle = wrapper.find('[data-testid="scroll-mode-toggle-checkbox"]');
				expect(toggle.exists()).toBe(false);
			});
		});

		describe("when the scroll mode toggle model value", () => {
			it("should be true when not in page scroll mode", () => {
				mockUseBoardScrollMode.mockReturnValue({
					scrollMode: ref("columns"),
					isPageScrollMode: computed(() => false),
					toggleScrollMode: mockToggleScrollMode,
				} as unknown as ReturnType<typeof useBoardScrollMode>);
				const { wrapper } = setup({}, { isListBoard: false });

				const toggle = wrapper.findComponent(VSwitch);
				expect(toggle.props("modelValue")).toBe(false);
			});

			it("should be false when in page scroll mode", () => {
				mockUseBoardScrollMode.mockReturnValue({
					scrollMode: ref("page"),
					isPageScrollMode: computed(() => true),
					toggleScrollMode: mockToggleScrollMode,
				} as unknown as ReturnType<typeof useBoardScrollMode>);
				const { wrapper } = setup({}, { isListBoard: false });

				const toggle = wrapper.findComponent(VSwitch);
				expect(toggle.props("modelValue")).toBe(true);
			});
		});

		describe("when the scroll mode toggle is changed", () => {
			it("should call toggleScrollMode", async () => {
				const { wrapper } = setup({}, { isListBoard: false });

				const toggle = wrapper.findComponent(VSwitch);
				toggle.vm.$emit("update:modelValue", true);

				expect(mockToggleScrollMode).toHaveBeenCalled();
			});
		});

		describe("when toggling from page mode to columns mode", () => {
			beforeEach(() => {
				mockUseBoardScrollMode.mockReturnValue({
					scrollMode: ref("page"),
					isPageScrollMode: computed(() => true),
					toggleScrollMode: mockToggleScrollMode,
				} as unknown as ReturnType<typeof useBoardScrollMode>);
			});

			it("should call toggleScrollMode", () => {
				const { wrapper } = setup({}, { isListBoard: false });

				wrapper.findComponent(VSwitch).vm.$emit("update:modelValue");

				expect(mockToggleScrollMode).toHaveBeenCalled();
			});

			it("should restore the scrollLeft from .main-content-flex to .column-board", () => {
				const { wrapper } = setup({}, { isListBoard: false });

				const columnBoard = document.createElement("div");
				columnBoard.className = "column-board";
				Object.defineProperty(columnBoard, "scrollLeft", { value: 0, writable: true });
				document.body.appendChild(columnBoard);

				const mainContent = document.createElement("div");
				Object.defineProperty(mainContent, "scrollLeft", { value: 250, writable: true });
				const setupState = (wrapper.vm as unknown as { $: { setupState: Record<string, unknown> } }).$.setupState;
				setupState["boardScrollContainer"] = mainContent;

				wrapper.findComponent(VSwitch).vm.$emit("update:modelValue");

				expect(columnBoard.scrollLeft).toBe(250);
				document.body.removeChild(columnBoard);
			});
		});

		describe("when toggling from columns mode to page mode", () => {
			it("should restore the scrollLeft from .column-board to .main-content-flex", () => {
				const { wrapper } = setup({}, { isListBoard: false });

				const columnBoard = document.createElement("div");
				columnBoard.className = "column-board";
				Object.defineProperty(columnBoard, "scrollLeft", { value: 350, writable: true });
				document.body.appendChild(columnBoard);

				const mainContent = document.createElement("div");
				Object.defineProperty(mainContent, "scrollLeft", { value: 0, writable: true });
				const setupState = (wrapper.vm as unknown as { $: { setupState: Record<string, unknown> } }).$.setupState;
				setupState["boardScrollContainer"] = mainContent;

				wrapper.findComponent(VSwitch).vm.$emit("update:modelValue");

				expect(mainContent.scrollLeft).toBe(350);
				document.body.removeChild(columnBoard);
			});
		});
	});

	describe("VDivider visibility", () => {
		const scrollY = ref(0);

		beforeEach(() => {
			scrollY.value = 0;
			mockUseScroll.mockReturnValue({ y: scrollY } as unknown as ReturnType<typeof useScroll>);
		});

		describe("when not in page scroll mode", () => {
			it("should not render the VDivider", () => {
				const { wrapper } = setup();

				expect(wrapper.findComponent(VDivider).exists()).toBe(false);
			});
		});

		describe("when in page scroll mode", () => {
			beforeEach(() => {
				mockUseBoardScrollMode.mockReturnValue({
					scrollMode: ref("page"),
					isPageScrollMode: computed(() => true),
					toggleScrollMode: vi.fn(),
				} as unknown as ReturnType<typeof useBoardScrollMode>);
			});

			it("should not render the VDivider when scroll position is at the top", () => {
				const { wrapper } = setup();

				expect(wrapper.findComponent(VDivider).exists()).toBe(false);
			});

			it("should render the VDivider when scrolled down", async () => {
				const { wrapper } = setup();

				scrollY.value = 100;
				await nextTick();

				expect(wrapper.findComponent(VDivider).exists()).toBe(true);
			});

			it("should not render the VDivider when scrolled back to the top", async () => {
				const { wrapper } = setup();

				scrollY.value = 100;
				await nextTick();
				scrollY.value = 0;
				await nextTick();

				expect(wrapper.findComponent(VDivider).exists()).toBe(false);
			});
		});

		describe("when scroll mode changes from page to column while scrolled", () => {
			it("should hide the VDivider after resetting hasScrolledInPageMode", async () => {
				const isPageScrollMode = ref(true);
				mockUseBoardScrollMode.mockReturnValue({
					scrollMode: ref("page"),
					isPageScrollMode,
					toggleScrollMode: vi.fn(),
				} as unknown as ReturnType<typeof useBoardScrollMode>);

				const { wrapper } = setup();

				scrollY.value = 100;
				await nextTick();
				expect(wrapper.findComponent(VDivider).exists()).toBe(true);

				isPageScrollMode.value = false;
				await nextTick();

				expect(wrapper.findComponent(VDivider).exists()).toBe(false);
			});
		});
	});
});
