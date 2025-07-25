import { ConfigResponse } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import {
	KebabMenuActionChangeLayout,
	KebabMenuActionCopy,
	KebabMenuActionDelete,
	KebabMenuActionPublish,
	KebabMenuActionRename,
	KebabMenuActionRevert,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { useCourseBoardEditMode } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { computed, ref } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardHeader from "./BoardHeader.vue";

vi.mock("@data-board/BoardPermissions.composable");
const mockedUserPermissions = vi.mocked(useBoardPermissions);

vi.mock("@data-board/BoardFocusHandler.composable");
const mockUseBoardFocusHandler = vi.mocked(useBoardFocusHandler);

vi.mock("@util-board/editMode.composable");
const mockedUseEditMode = vi.mocked(useCourseBoardEditMode);

describe("BoardHeader", () => {
	const setup = (
		options?: {
			permissions?: Partial<BoardPermissionChecks>;
			envs?: Partial<ConfigResponse>;
		},
		props?: { isDraft: boolean }
	) => {
		const isEditMode = computed(() => true);
		const mockedStartEditMode = vi.fn();
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: mockedStartEditMode,
			stopEditMode: vi.fn(),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		mockUseBoardFocusHandler.mockReturnValue({
			isFocusContained: undefined,
		});

		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { ...options?.envs } as ConfigResponse,
		});

		const wrapper = shallowMount(BoardHeader, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
				stubs: {
					VTooltip: false,
					VOverlay: false,
				},
			},
			props: {
				title: "title-text",
				titlePlaceholder: "Board 1",
				boardId: "abc123",
				isDraft: props?.isDraft || false,
			},
		});
		return { startEditMode: mockedStartEditMode, wrapper };
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
		describe("when user is not permitted to edit the board", () => {
			it("should not find the BoardMenu in the DOM", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: ref(false) },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});

		describe("when user is permitted to edit the board", () => {
			it("should find the BoardMenu in the DOM", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: ref(true) },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(1);
			});

			it("should enable copying", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: ref(true) },
					envs: { FEATURE_COLUMN_BOARD_SHARE: true },
				});

				const shareButton = wrapper.findComponent(KebabMenuActionShare);

				expect(shareButton.exists()).toBe(true);
			});

			it("should enable sharing with feature flag", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: ref(true) },
					envs: { FEATURE_COLUMN_BOARD_SHARE: true },
				});

				const shareButton = wrapper.findComponent(KebabMenuActionShare);

				expect(shareButton.exists()).toBe(true);
			});

			it("should disable sharing with feature flag", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: ref(true) },
					envs: { FEATURE_COLUMN_BOARD_SHARE: false },
				});

				const shareButton = wrapper.findComponent(KebabMenuActionShare);

				expect(shareButton.exists()).toBe(false);
			});
		});
	});

	describe("when the 'edit' menu button is clicked", () => {
		it("should call startEditMode", async () => {
			const { startEditMode, wrapper } = setup();

			const editButton = wrapper.findComponent(KebabMenuActionRename);
			await editButton.trigger("click");

			expect(startEditMode).toHaveBeenCalled();
		});
	});

	describe("when the title is updated", () => {
		describe("when the title is empty", () => {
			it("should not emit 'update:title'", () => {
				vi.useFakeTimers();

				const { wrapper } = setup();

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

				const { wrapper } = setup();

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "new-title");

				vi.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeDefined();
			});
		});
	});

	describe("when the title loses focus", () => {
		describe("when the title is empty", () => {
			it("should emit 'update:title'", () => {
				vi.useFakeTimers();

				const { wrapper } = setup();

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

				const { wrapper } = setup();

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
			const { wrapper } = setup();

			const copyButton = wrapper.findComponent(KebabMenuActionCopy);
			await copyButton.trigger("click");

			expect(wrapper.emitted("copy:board")).toHaveLength(1);
		});
	});

	describe("when the 'share' menu button is clicked", () => {
		it("should emit 'share:board'", async () => {
			const { wrapper } = setup({
				permissions: { hasShareBoardPermission: ref(true) },
				envs: { FEATURE_COLUMN_BOARD_SHARE: true },
			});

			const copyButton = wrapper.findComponent(KebabMenuActionShare);
			await copyButton.trigger("click");

			expect(wrapper.emitted("share:board")).toHaveLength(1);
		});
	});

	describe("when the 'revert' menu button is clicked", () => {
		it("should emit 'revert'", async () => {
			const { wrapper } = setup();

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
			const { wrapper } = setup();

			const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
			await deleteButton.trigger("click");

			expect(wrapper.emitted("delete:board")).toHaveLength(1);
		});
	});

	describe("when the 'change layout' menu button is clicked", () => {
		it("should emit 'change-layout'", async () => {
			const { wrapper } = setup();

			const changeLayoutButton = wrapper.findComponent(
				KebabMenuActionChangeLayout
			);
			await changeLayoutButton.trigger("click");

			expect(wrapper.emitted("change-layout")).toHaveLength(1);
		});
	});

	describe("when board is a draft", () => {
		it("should display draft label", () => {
			const { wrapper } = setup(
				{
					permissions: { hasEditPermission: ref(true) },
				},
				{ isDraft: true }
			);

			expect(wrapper.findComponent({ name: "BoardDraftChip" }).exists()).toBe(
				true
			);
		});

		it("should display 'publish' button instead of 'revert' button in menu", async () => {
			const { wrapper } = setup(
				{
					permissions: { hasEditPermission: ref(true) },
				},
				{ isDraft: true }
			);

			const revertButton = wrapper.findComponent(KebabMenuActionRevert);
			expect(revertButton.exists()).toBe(false);

			const publishButton = wrapper.findComponent(KebabMenuActionPublish);
			expect(publishButton.exists()).toBe(true);
		});

		describe("when the 'publish' menu button is clicked", () => {
			it("should emit 'publish", async () => {
				const { wrapper } = setup(
					{
						permissions: { hasEditPermission: ref(true) },
					},
					{ isDraft: true }
				);

				const publishButton = wrapper.findComponent(KebabMenuActionPublish);
				expect(publishButton.exists()).toBe(true);
				await publishButton.trigger("click");

				const emitted = wrapper.emitted("update:visibility");

				expect(emitted).toBeDefined();
				expect(emitted![0]).toStrictEqual([true]);
			});
		});
	});
});
