import {
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { shallowMount } from "@vue/test-utils";
import { useBoardPermissions } from "@data-board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import BoardColumnVue from "./BoardColumn.vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import { nextTick } from "vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { envConfigModule, notifierModule } from "@/store";

const { isDragging, dragEnd } = useDragAndDrop();

jest.mock("@data-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

describe("BoardColumn", () => {
	const cards = cardSkeletonResponseFactory.buildList(3);
	const column = columnResponseFactory.build({
		cards,
	});

	const setup = (
		props?: object,
		options?: {
			permissions?: Partial<BoardPermissionChecks>;
		}
	) => {
		document.body.setAttribute("data-app", "true");
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		const wrapper = shallowMount(BoardColumnVue, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
			propsData: {
				column,
				index: 1,
				columnCount: 1,
				isListBoard: false,
				...props,
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBe(true);
		});
	});

	describe("when a card moved ", () => {
		it("should emit 'card-position-change'", async () => {
			const { wrapper } = setup();

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

			const expectedEmitObject = {
				oldIndex: 0,
				newIndex: 1,
				cardId: "card-id",
				fromColumnId: "from-column-id",
				toColumnId: "to-column-id",
			};

			const containerComponent = wrapper.findComponent({ name: "Sortable" });
			containerComponent.vm.$emit("end", emitObject);

			const emitted = wrapper.emitted("update:card-position") || [[]];

			expect(emitted[0][0]).toStrictEqual(expectedEmitObject);
		});

		it("should not emit 'card-position-change'", async () => {
			const { wrapper } = setup();
			const emitObject = {
				removedIndex: null,
				addedIndex: null,
				payload: column.cards[0],
			};
			const containerComponent = wrapper.findComponent({ name: "Sortable" });
			containerComponent.vm.$emit("drop", emitObject);

			const emitted = wrapper.emitted("update:card-position");

			expect(emitted).toBeUndefined();
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
			it("should addCardComponent not be rendered on DOM", () => {
				const { wrapper } = setup({
					permissions: { hasCreateColumnPermission: false },
				});

				const addCardComponent = wrapper.findAllComponents({
					name: "BoardAddCardButton",
				});

				expect(addCardComponent.length).toStrictEqual(0);
			});
		});
	});

	describe("when move was triggered by column header", () => {
		describe("when board is list board", () => {
			describe("when move:column-left was triggered by column header via keyboard", () => {
				it("should emit move:column-left", async () => {
					const { wrapper } = setup({ isListBoard: true });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-left");
					await nextTick();

					const emitted = wrapper.emitted("move:column-left");
					expect(emitted).toHaveLength(1);
				});
			});

			describe("when move:column-right was triggered by column header via keyboard", () => {
				it("should emit move:column-right", async () => {
					const { wrapper } = setup({ isListBoard: true });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-right");
					await nextTick();

					const emitted = wrapper.emitted("move:column-right");
					expect(emitted).toHaveLength(1);
				});
			});

			describe("when move:column-down was triggered by column header via menu", () => {
				it("should emit move:column-down", async () => {
					const { wrapper } = setup({ isListBoard: true });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-down");
					await nextTick();

					const emitted = wrapper.emitted("move:column-down");
					expect(emitted).toHaveLength(1);
				});
			});

			describe("when move:column-up was triggered by column header via menu", () => {
				it("should emit move:column-up", async () => {
					const { wrapper } = setup({ isListBoard: true });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-up");
					await nextTick();

					const emitted = wrapper.emitted("move:column-up");
					expect(emitted).toHaveLength(1);
				});
			});
		});

		describe("when board is column board", () => {
			describe("when move:column-left was triggered by column header", () => {
				it("should emit move:column-left", async () => {
					const { wrapper } = setup({ isListBoard: false });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-left");
					await nextTick();

					const emitted = wrapper.emitted("move:column-left");
					expect(emitted).toHaveLength(1);
				});
			});

			describe("when move:column-right was triggered by column header", () => {
				it("should emit move:column-right", async () => {
					const { wrapper } = setup({ isListBoard: false });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-right");
					await nextTick();

					const emitted = wrapper.emitted("move:column-right");
					expect(emitted).toHaveLength(1);
				});
			});

			describe("when move:column-down was triggered by column header", () => {
				it("should not emit move:column-down", async () => {
					const { wrapper } = setup({ isListBoard: false });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-down");
					await nextTick();

					const emitted = wrapper.emitted("move:column-down");
					expect(emitted).toBeUndefined;
				});
			});

			describe("when move:column-up was triggered by column header", () => {
				it("should not emit move:column-up", async () => {
					const { wrapper } = setup({ isListBoard: false });

					const columnHeader = wrapper.findComponent({
						name: "BoardColumnHeader",
					});
					columnHeader.vm.$emit("move:column-up");
					await nextTick();

					const emitted = wrapper.emitted("move:column-up");
					expect(emitted).toBeUndefined();
				});
			});
		});
	});
});
