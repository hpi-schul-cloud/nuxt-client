import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	createTestEnvStore,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import {
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	useBoardPermissions,
	useBoardStore,
	useForceRender,
} from "@data-board";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { useDragAndDrop, useSharedLastCreatedElement } from "@util-board";
import { computed, nextTick, ref } from "vue";
import BoardColumnVue from "./BoardColumn.vue";
import { setActivePinia } from "pinia";

const { isDragging, dragStart, dragEnd } = useDragAndDrop();

vi.mock("vue-router");

vi.mock("@data-board/BoardPermissions.composable");
const mockedUserPermissions = vi.mocked(useBoardPermissions);

vi.mock("@util-board/LastCreatedElement.composable");
const mockUseSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);

vi.mock("@data-board/fixSamePositionDnD.composable");
const mockedUseForceRender = vi.mocked(useForceRender);

mockUseSharedLastCreatedElement.mockReturnValue({
	lastCreatedElementId: computed(() => "element-id"),
	resetLastCreatedElementId: vi.fn(),
});

describe("BoardColumn", () => {
	let mockedUseForceRenderHandler: ReturnType<typeof useForceRender>;

	beforeEach(() => {
		setupStores({});
		setActivePinia(createTestingPinia());
		createTestEnvStore({ FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false });

		mockedUseForceRenderHandler =
			createMock<ReturnType<typeof useForceRender>>();
		mockedUseForceRender.mockReturnValue(mockedUseForceRenderHandler);
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

		const wrapper = mount(BoardColumnVue, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia(),
				],
			},
			props: {
				column,
				index: 1,
				columnCount: 1,
				isListBoard: false,
			},
		});

		const store = mockedPiniaStoreTyping(useBoardStore);

		return { wrapper, store, cards, column };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBe(true);
		});

		it("should trigger 'getRenderKey' method", () => {
			setup();
			expect(mockedUseForceRenderHandler.getRenderKey).toHaveBeenCalled();
		});
	});

	describe("when a card moved ", () => {
		it("should call 'moveCardRequest' method", () => {
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
			it("should not call 'moveCardRequest' method", () => {
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

		describe("when a card is moved by keyboard", () => {
			describe("when ArrowDown key is pressed for first card", () => {
				it("should call 'moveCardRequest' method", () => {
					const { wrapper, store } = setup({ cardsCount: 3 });

					const cardHostComponents = wrapper.findAllComponents({
						name: "CardHost",
					});
					const firstCard = cardHostComponents.at(0);
					firstCard!.vm.$emit("move:card-keyboard", "ArrowDown");

					expect(store.moveCardRequest).toHaveBeenCalled();
				});
			});

			describe("when ArrowDown key is pressed for last card", () => {
				it("should call 'moveCardRequest' method", () => {
					const { wrapper, store } = setup({ cardsCount: 3 });

					const cardHostComponents = wrapper.findAllComponents({
						name: "CardHost",
					});
					const lastCard = cardHostComponents.at(-1);
					lastCard!.vm.$emit("move:card-keyboard", "ArrowDown");

					expect(store.moveCardRequest).not.toHaveBeenCalled();
				});
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
				containerComponent.trigger("drag-start", emitObject);

				expect(isDragging.value).toBe(false);
			});
		});

		it("addCardButton should not be visible", async () => {
			const { wrapper } = setup();

			dragStart();
			await nextTick();
			const addCardButton = wrapper.findComponent({
				name: "BoardAddCardButton",
			});

			expect(addCardButton.exists()).toBe(false);
		});
	});

	describe("when a card is ended dragging", () => {
		it("should set 'isDragging' value to be false", () => {
			const { wrapper } = setup();
			const emitObject = {
				isSource: false,
				payload: { cardId: "card-id", height: 100 },
				willAcceptDrop: false,
			};
			const containerComponent = wrapper.findComponent({ name: "Sortable" });
			containerComponent.vm.$emit("end", emitObject);

			expect(isDragging.value).toBe(false);
		});

		describe("when it is dropped onto ghost column (= no data-columnId) location", () => {
			it("should call moveCardToNewColumn", () => {
				const { wrapper, store } = setup();

				const emitObject = {
					isSource: false,
					payload: {
						cardId: "card-id",
						height: 100,
					},
				};
				const containerComponent = wrapper.findComponent({ name: "Sortable" });
				containerComponent.vm.$emit("end", emitObject);

				expect(store.moveCardToNewColumn).toHaveBeenCalled();
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to move a column", () => {
			it("should set drag-disabled", () => {
				const { wrapper } = setup({
					permissions: { hasMovePermission: ref(false) },
				});

				const dndContainer = wrapper.findComponent({ name: "Sortable" });
				expect(dndContainer.vm.options.disabled).toBe(true);
			});
		});

		describe("when user is not permitted to create a card", () => {
			it("addCardButton should not be visible", () => {
				const { wrapper } = setup({
					permissions: { hasCreateColumnPermission: ref(false) },
				});

				const addCardButton = wrapper.findComponent({
					name: "BoardAddCardButton",
				});

				expect(addCardButton.exists()).toBe(false);
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
