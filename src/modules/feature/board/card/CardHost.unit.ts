import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	envsFactory,
	fileElementResponseFactory,
	cardResponseFactory,
} from "@@/tests/test-utils/factory";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardStore,
	useEditMode,
	useSharedEditMode,
} from "@data-board";
import { BoardMenuActionDelete } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { shallowMount } from "@vue/test-utils";
import { computed, ref } from "vue";
import { setupAddElementDialogMock } from "../test-utils/AddElementDialogMock";
import CardHost from "./CardHost.vue";
import ContentElementList from "./ContentElementList.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { CardResponse } from "@/serverApi/v3";

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);
const mockedSharedLastCreatedElement = jest.mocked(useSharedLastCreatedElement);

jest.mock("@data-board/BoardFocusHandler.composable");
const mockedBoardFocusHandler = jest.mocked(useBoardFocusHandler);

jest.mock("@data-board/BoardPermissions.composable");
const mockedUseBoardPermissions = jest.mocked(useBoardPermissions);

jest.mock("@data-board/EditMode.composable");
const mockedEditMode = jest.mocked(useEditMode);

jest.mock("@data-board/EditMode.composable");
const mockedUseSharedEditMode = jest.mocked(useSharedEditMode);

jest.mock("../shared/AddElementDialog.composable");
jest.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = jest.mocked(
	useDeleteConfirmationDialog
);

describe("CardHost", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardPermissionsHandler: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;
	let mockedBoardPermissions: BoardPermissionChecks;
	let mockedSharedLastCreatedElementCalls: DeepMocked<
		ReturnType<typeof useSharedLastCreatedElement>
	>;

	beforeEach(() => {
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(envs);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		mockedUseSharedEditMode.mockReturnValue({
			editModeId: ref(undefined),
			setEditModeId: jest.fn(),
		});

		mockedBoardFocusHandler.mockReturnValue({
			isFocusContained: computed(() => true),
			isFocused: computed(() => true),
			isFocusWithin: computed(() => true),
			isFocusedById: computed(() => true),
		});

		mockedEditMode.mockReturnValue({
			isEditMode: computed(() => true),
			startEditMode: jest.fn(),
			stopEditMode: jest.fn(),
		});

		setupAddElementDialogMock();
		const askDeleteConfirmationMock = async () => await Promise.resolve(true);
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		mockedBoardPermissionsHandler =
			createMock<ReturnType<typeof useBoardPermissions>>();
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissionsHandler);

		mockedBoardPermissions = { ...defaultPermissions };
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissions);
		mockedSharedLastCreatedElementCalls =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		mockedSharedLastCreatedElement.mockReturnValue(
			mockedSharedLastCreatedElementCalls
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = (options?: { hasCard?: boolean; hasElement?: boolean }) => {
		const { hasElement, hasCard } = {
			hasCard: true,
			hasElement: false,
			...options,
		};

		let card: CardResponse | null = null;
		if (hasCard) {
			card = cardResponseFactory.build({
				elements: hasElement ? [fileElementResponseFactory.build()] : [],
			});
		}

		const wrapper = shallowMount(CardHost, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							cardStore: {
								cards: card ? { [card.id]: card } : {},
							},
						},
						stubActions: false,
					}),
					createTestingVuetify(),
					createTestingI18n(),
				],
			},
			propsData: {
				cardId: card?.id ?? "cardId",
				height: card?.height ?? 0,
			},
		});

		mockedPiniaStoreTyping(useCardStore);

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(CardHost).exists()).toBe(true);
		});

		describe("'CardSkeleton' component", () => {
			it("should be rendered if card is not loaded", () => {
				const { wrapper } = setup({ hasCard: false });

				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					true
				);
			});

			it("should not be rendered if card is loaded", () => {
				const { wrapper } = setup();
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					false
				);
			});
		});

		describe("'ContentElementList' component", () => {
			it("should be found in dom", () => {
				const { wrapper } = setup({});

				const contentElementList = wrapper.findComponent(ContentElementList);

				expect(contentElementList.exists()).toBe(true);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete", () => {
			it("should not be rendered on DOM", () => {
				mockedBoardPermissions.hasDeletePermission = false;
				const { wrapper } = setup();

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});

	describe("card menus", () => {
		describe("when users click delete menu", () => {
			it("should emit 'delete:card'", async () => {
				mockedBoardPermissions.hasDeletePermission = true;
				const { wrapper } = setup();

				const deleteButton = wrapper.findComponent(BoardMenuActionDelete);

				await deleteButton.vm.$emit("click", true);

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted()["delete:card"] ?? [];

				expect(emitted).toHaveLength(1);
			});
		});
	});
});
