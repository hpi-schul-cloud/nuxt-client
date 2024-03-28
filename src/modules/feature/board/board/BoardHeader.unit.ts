import { ConfigResponse } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import {
	BoardMenuActionCopy,
	BoardMenuActionEdit,
	BoardMenuActionPublish,
	BoardMenuActionRevert,
	BoardMenuActionShare,
} from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import { computed } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardHeader from "./BoardHeader.vue";

jest.mock("@data-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

describe("BoardHeader", () => {
	const mockedUseEditMode = jest.mocked(useEditMode);

	const setup = (
		options?: {
			permissions?: Partial<BoardPermissionChecks>;
			envs?: Partial<ConfigResponse>;
		},
		props?: { isDraft: boolean }
	) => {
		const isEditMode = computed(() => true);
		const mockedStartEditMode = jest.fn();
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: mockedStartEditMode,
			stopEditMode: jest.fn(),
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
					permissions: { hasEditPermission: false },
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
					permissions: { hasEditPermission: true },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(1);
			});

			it("should enable copying", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: true },
				});

				const editButton = wrapper.findComponent(BoardMenuActionEdit);

				expect(editButton.exists()).toBe(true);
			});

			it("should enable sharing with feature flag", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: true },
					envs: { FEATURE_COLUMN_BOARD_SHARE: true },
				});

				const shareButton = wrapper.findComponent(BoardMenuActionShare);

				expect(shareButton.exists()).toBe(true);
			});

			it("should disable sharing with feature flag", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: true },
					envs: { FEATURE_COLUMN_BOARD_SHARE: false },
				});

				const shareButton = wrapper.findComponent(BoardMenuActionShare);

				expect(shareButton.exists()).toBe(false);
			});
		});
	});

	describe("when the 'edit' menu button is clicked", () => {
		it("should call startEditMode", async () => {
			const { startEditMode, wrapper } = setup();

			const editButton = wrapper.findComponent(BoardMenuActionEdit);
			await editButton.trigger("click");

			expect(startEditMode).toBeCalled();
		});
	});

	describe("when the title is updated", () => {
		describe("when the title is empty", () => {
			it("should not emit 'update:title'", () => {
				jest.useFakeTimers();

				const { wrapper } = setup();

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "");

				jest.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeUndefined();
			});
		});

		describe("when the title is not empty", () => {
			it("should emit 'update:title'", () => {
				jest.useFakeTimers();

				const { wrapper } = setup();

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "new-title");

				jest.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeDefined();
			});
		});
	});

	describe("when the title loses focus", () => {
		describe("when the title is empty", () => {
			it("should emit 'update:title'", () => {
				jest.useFakeTimers();

				const { wrapper } = setup();

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "");
				titleInput.vm.$emit("blur");

				jest.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted).toBeDefined();
				expect(emitted?.[0][0]).toEqual(
					"pages.room.boardCard.label.courseBoard"
				);
			});
		});

		describe("when the title is not empty", () => {
			it("should not emit 'update:title'", () => {
				jest.useFakeTimers();

				const { wrapper } = setup();

				const titleInput = wrapper.findComponent(BoardAnyTitleInput);
				titleInput.vm.$emit("update:value", "newTitle");
				titleInput.vm.$emit("blur");

				jest.runAllTimers();

				const emitted = wrapper.emitted("update:title");
				expect(emitted?.[1]).toBeUndefined();
			});
		});
	});

	describe("when the 'copy' menu button is clicked", () => {
		it("should emit 'copy:board'", async () => {
			const { wrapper } = setup();

			const copyButton = wrapper.findComponent(BoardMenuActionCopy);
			await copyButton.trigger("click");

			expect(wrapper.emitted("copy:board")).toHaveLength(1);
		});
	});

	describe("when the 'share' menu button is clicked", () => {
		it("should emit 'share:board'", async () => {
			const { wrapper } = setup({
				permissions: { hasEditPermission: true },
				envs: { FEATURE_COLUMN_BOARD_SHARE: true },
			});

			const copyButton = wrapper.findComponent(BoardMenuActionShare);
			await copyButton.trigger("click");

			expect(wrapper.emitted("share:board")).toHaveLength(1);
		});
	});

	describe("when the 'revert' menu button is clicked", () => {
		it("should emit 'revert'", async () => {
			const { wrapper } = setup();

			const revertButton = wrapper.findComponent(BoardMenuActionRevert);
			expect(revertButton.exists()).toBe(true);
			await revertButton.trigger("click");

			const emitted = wrapper.emitted("update:visibility");

			expect(emitted).toBeDefined();
			expect(emitted![0]).toStrictEqual([false]);
		});
	});

	describe("when board is a draft", () => {
		it("should display draft label", () => {
			const { wrapper } = setup(
				{
					permissions: { hasEditPermission: true },
				},
				{ isDraft: true }
			);

			expect(wrapper.findComponent({ name: "v-chip" }).exists()).toBe(true);
		});

		it("should display 'publish' button instead of 'revert' button in menu", async () => {
			const { wrapper } = setup(
				{
					permissions: { hasEditPermission: true },
				},
				{ isDraft: true }
			);

			const revertButton = wrapper.findComponent(BoardMenuActionRevert);
			expect(revertButton.exists()).toBe(false);

			const publishButton = wrapper.findComponent(BoardMenuActionPublish);
			expect(publishButton.exists()).toBe(true);
		});

		describe("when the 'publish' menu button is clicked", () => {
			it("should emit 'publish", async () => {
				const { wrapper } = setup(
					{
						permissions: { hasEditPermission: true },
					},
					{ isDraft: true }
				);

				const publishButton = wrapper.findComponent(BoardMenuActionPublish);
				expect(publishButton.exists()).toBe(true);
				await publishButton.trigger("click");

				const emitted = wrapper.emitted("update:visibility");

				expect(emitted).toBeDefined();
				expect(emitted![0]).toStrictEqual([true]);
			});
		});
	});
});
