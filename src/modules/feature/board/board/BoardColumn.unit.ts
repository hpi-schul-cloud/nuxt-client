import {
	cardSkeletonResponseFactory,
	columnResponseFactory,
	envsFactory,
} from "@@/tests/test-utils/factory";
import { shallowMount } from "@vue/test-utils";
import { useBoardPermissions, useBoardStore } from "@data-board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import BoardColumnVue from "./BoardColumn.vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { envConfigModule, notifierModule } from "@/store";
import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";

const { isDragging, dragEnd } = useDragAndDrop();

jest.mock("@data-board/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

jest.mock("@util-board");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("BoardColumn", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(envs);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
	});

	const setup = (options?: {
		permissions?: Partial<BoardPermissionChecks>;
		cardsCount?: number;
	}) => {
		const cards = cardSkeletonResponseFactory.buildList(
			options?.cardsCount ?? 3
		);
		const column = columnResponseFactory.build({
			cards,
		});
		document.body.setAttribute("data-app", "true");
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		const wrapper = shallowMount(BoardColumnVue, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia(),
				],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
			props: {
				column,
				index: 1,
				columnCount: 1,
				isListBoard: false,
			},
		});

		const store = mockedPiniaStoreTyping(useBoardStore);

		return { wrapper, store };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBe(true);
		});
	});

	describe("when a card moved ", () => {
		it("should call 'moveCardRequest' method", async () => {
			const { wrapper, store } = setup();

			const emitObject = {
				oldIndex: 0,
				newIndex: 1,
				item: {
					dataset: {
						cardId: "card-id",
					},
				},
				to: {
					dataset: {
						columnId: "to-column-id",
					},
				},
				from: {
					dataset: {
						columnId: "from-column-id",
					},
				},
			};

			const containerComponent = wrapper.findComponent({ name: "Sortable" });
			containerComponent.vm.$emit("end", emitObject);

			expect(store.moveCardRequest).toHaveBeenCalled();
		});

		describe("when a card is moved to its column and the same position", () => {
			it("should not call 'moveCardRequest' method", async () => {
				const { wrapper, store } = setup({ cardsCount: 1 });

				const emitObject = {
					item: {
						dataset: {
							cardId: "card-id",
						},
					},
					to: {
						dataset: {
							columnId: "same-column-id",
						},
					},
					from: {
						dataset: {
							columnId: "same-column-id",
						},
					},
				};

				const containerComponent = wrapper.findComponent({ name: "Sortable" });
				containerComponent.vm.$emit("end", emitObject);

				expect(store.moveCardRequest).not.toHaveBeenCalled();
			});
		});
	});

	describe("when a card is started dragging", () => {
		beforeEach(() => {
			dragEnd();
		});
		describe("if payload has 'cardId'", () => {
			it("should set 'isDragging' value to be true", () => {
				const { wrapper } = setup();
				const emitObject = {
					isSource: false,
					payload: { cardId: "card-id", height: 100 },
					willAcceptDrop: false,
				};
				const containerComponent = wrapper.findComponent({ name: "Sortable" });
				containerComponent.vm.$emit("start", emitObject);

				expect(isDragging.value).toBe(true);
			});
		});

		describe("if payload doesn't have 'cardId'", () => {
			it("should not set 'isDragging' value to be true", () => {
				const { wrapper } = setup();
				const emitObject = {
					isSource: false,
					payload: "12345",
					willAcceptDrop: false,
				};
				const containerComponent = wrapper.findComponent({ name: "Sortable" });
				containerComponent.vm.$emit("drag-start", emitObject);

				expect(isDragging.value).toBe(false);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to move a column", () => {
			it("should set drag-disabled", () => {
				const { wrapper } = setup({
					permissions: { hasMovePermission: false },
				});

				const dndContainer = wrapper.findComponent({ name: "Sortable" });
				expect(dndContainer.vm.options.disabled).toBe(true);
			});
		});

		describe("when user is not permitted to create a card", () => {
			it("addCardComponent should not be visible", () => {
				const { wrapper } = setup({
					permissions: { hasCreateColumnPermission: false },
				});

				const addCardComponent = wrapper.findComponent({
					name: "BoardAddCardButton",
				});

				expect(addCardComponent.attributes("style")).toStrictEqual(
					"visibility: hidden;"
				);
			});
		});
	});

	describe("when move was triggered by column header", () => {
		describe("when move:column-left was triggered by column header", () => {
			it("should emit move:column-left", async () => {
				const { wrapper } = setup();

				const columnHeader = wrapper.findComponent({
					name: "BoardColumnHeader",
				});
				await columnHeader.vm.$emit("move:column-left");

				const emitted = wrapper.emitted("move:column-left");
				expect(emitted).toHaveLength(1);
			});
		});

		describe("when move:column-right was triggered by column header", () => {
			it("should emit move:column-right", async () => {
				const { wrapper } = setup();

				const columnHeader = wrapper.findComponent({
					name: "BoardColumnHeader",
				});
				await columnHeader.vm.$emit("move:column-right");

				const emitted = wrapper.emitted("move:column-right");
				expect(emitted).toHaveLength(1);
			});
		});

		describe("when move:column-down was triggered by column header", () => {
			it("should emit move:column-down", async () => {
				const { wrapper } = setup();

				const columnHeader = wrapper.findComponent({
					name: "BoardColumnHeader",
				});
				await columnHeader.vm.$emit("move:column-down");

				const emitted = wrapper.emitted("move:column-down");
				expect(emitted).toHaveLength(1);
			});
		});

		describe("when move:column-up was triggered by column header", () => {
			it("should emit move:column-up", async () => {
				const { wrapper } = setup();

				const columnHeader = wrapper.findComponent({
					name: "BoardColumnHeader",
				});
				await columnHeader.vm.$emit("move:column-up");

				const emitted = wrapper.emitted("move:column-up");
				expect(emitted).toHaveLength(1);
			});
		});
	});
});
