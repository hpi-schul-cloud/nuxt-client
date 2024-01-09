import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import {
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import CardHost from "../card/CardHost.vue";
import {
	useBoardPermissions,
	useEditMode,
	useSharedEditMode,
} from "@data-board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import BoardColumnVue from "./BoardColumn.vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import Vue, { computed, nextTick } from "vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Container } = require("vue-dndrop");

const { isDragging, dragEnd } = useDragAndDrop();

jest.mock("@data-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

jest.mocked(useSharedEditMode);

describe("BoardColumn", () => {
	let wrapper: Wrapper<Vue>;

	const cards = cardSkeletonResponseFactory.buildList(3);
	const column = columnResponseFactory.build({
		cards,
	});

	const setup = (options?: {
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		document.body.setAttribute("data-app", "true");
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		const mockedUseEditMode = jest.mocked(useEditMode);

		const isEditMode = computed(() => true);
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: jest.fn(),
			stopEditMode: jest.fn(),
		});

		wrapper = shallowMount(BoardColumnVue as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
			propsData: { column, index: 1, columnCount: 1 },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBe(true);
		});

		it("should get props and render CarHost components", () => {
			setup();
			expect(wrapper.findAllComponents(CardHost)).toHaveLength(3);
		});
	});

	describe("when a card moved by key stroke", () => {
		it("should emit 'position-change-keyboard'", async () => {
			setup();
			const expectedEmitObject = {
				removedIndex: 0,
				addedIndex: 0,
				payload: column.cards[0],
				columnIndex: 0,
			};

			const cardHostComponent = wrapper.findComponent(CardHost);
			cardHostComponent.vm.$emit("move:card-keyboard", "ArrowLeft");

			const emitted = wrapper.emitted("update:card-position") || [[]];
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(emitted[0][0]).toStrictEqual(expectedEmitObject);
		});
	});

	describe("when a card moved ", () => {
		it("should emit 'card-position-change'", async () => {
			setup();
			const emitObject = {
				removedIndex: 0,
				addedIndex: 0,
				payload: column.cards[0],
				targetColumnId: column.id,
				columnId: column.id,
			};

			const containerComponent = wrapper.findComponent(Container);
			containerComponent.vm.$emit("drop", emitObject);

			const emitted = wrapper.emitted("update:card-position") || [[]];

			expect(emitted[0][0]).toStrictEqual(emitObject);
		});

		it("should not emit 'card-position-change'", async () => {
			setup();
			const emitObject = {
				removedIndex: null,
				addedIndex: null,
				payload: column.cards[0],
			};
			const containerComponent = wrapper.findComponent(Container);
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
				setup();
				const emitObject = {
					isSource: false,
					payload: { cardId: "card-id", height: 100 },
					willAcceptDrop: false,
				};
				const containerComponent = wrapper.findComponent(Container);
				containerComponent.vm.$emit("drag-start", emitObject);

				expect(isDragging.value).toBe(true);
			});
		});

		describe("if payload doesn't have 'cardId'", () => {
			it("should not set 'isDragging' value to be true", () => {
				setup();
				const emitObject = {
					isSource: false,
					payload: "12345",
					willAcceptDrop: false,
				};
				const containerComponent = wrapper.findComponent(Container);
				containerComponent.vm.$emit("drag-start", emitObject);

				expect(isDragging.value).toBe(false);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to move a column", () => {
			it("should set drag-disabled", () => {
				setup({ permissions: { hasMovePermission: false } });

				const dndContainer = wrapper.findComponent({ name: "Container" });
				expect(dndContainer.element.outerHTML).toContain(".drag-disabled");
			});
		});
		describe("when user is not permitted to create a card", () => {
			it("should addCardComponent not be rendered on DOM", () => {
				setup({ permissions: { hasCreateColumnPermission: false } });

				const addCardComponent = wrapper.findAllComponents({
					name: "BoardAddCardButton",
				});

				expect(addCardComponent.length).toStrictEqual(0);
			});
		});
	});

	describe("when reload:board was triggered by a card", () => {
		it("should emit reload:board", async () => {
			setup();

			const cardComponents = wrapper.findAllComponents({
				name: "CardHost",
			});
			cardComponents.at(0).vm.$emit("reload:board");
			await nextTick();

			const emitted = wrapper.emitted("reload:board");
			expect(emitted).toHaveLength(1);
		});
	});

	describe("when move was triggered by column header", () => {
		describe("when move:column-keyboard was triggered by column header", () => {
			it("should emit move:column-keyboard", async () => {
				setup();

				const columnHeader = wrapper.findComponent({
					name: "BoardColumnHeader",
				});
				columnHeader.vm.$emit("move:column-keyboard", "ArrowLeft");
				await nextTick();

				const emitted = wrapper.emitted("move:column-keyboard");
				expect(emitted).toHaveLength(1);
			});
		});
		describe("when move:column-left was triggered by column header", () => {
			it("should emit move:column-left", async () => {
				setup();

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
				setup();

				const columnHeader = wrapper.findComponent({
					name: "BoardColumnHeader",
				});
				columnHeader.vm.$emit("move:column-right");
				await nextTick();

				const emitted = wrapper.emitted("move:column-right");
				expect(emitted).toHaveLength(1);
			});
		});
	});
});
