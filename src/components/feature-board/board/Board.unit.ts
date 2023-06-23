import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import {
	boardResponseFactory,
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import { Route } from "vue-router";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { useBoardState } from "../state/BoardState.composable";
import { Board, BoardPermissionsTypes } from "../types/Board";
import BoardVue from "./Board.vue";
import BoardColumnVue from "./BoardColumn.vue";

jest.mock("../state/BoardState.composable");
const mockedUseBoardState = jest.mocked(useBoardState);

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const $route: Route = {
	params: {
		id: "a1b2c3",
	},
	path: "/rooms/a1b2c3/board",
	fullPath: "/rooms/a1b2c3/board",
	hash: "",
	query: {
		id: "a1b2c3",
	},
	matched: [],
} as Route;

const $router = { replace: jest.fn(), push: jest.fn(), afterEach: jest.fn() };

const defaultPermissions = {
	hasMovePermission: true,
	hasCreateCardPermission: true,
	hasCreateColumnPermission: true,
	hasDeletePermission: true,
	hasEditPermission: true,
};

const createCardMock = jest.fn();
const createColumnMock = jest.fn();
const createColumnWithCardMock = jest.fn();
const deleteCardMock = jest.fn();
const deleteColumnMock = jest.fn();
const moveColumnMock = jest.fn();
const moveCardMock = jest.fn();
const updateColumnTitleMock = jest.fn();
const fetchBoardMock = jest.fn();

describe("Board", () => {
	let wrapper: Wrapper<Vue>;

	const cards = cardSkeletonResponseFactory.buildList(3);
	const oneColumn = columnResponseFactory.build({ cards });
	const boardWithOneColumn = boardResponseFactory.build({
		columns: [oneColumn],
	});

	const setup = (options?: {
		board?: Board;
		isLoading?: boolean;
		permissions?: BoardPermissionsTypes;
	}) => {
		const { board, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");
		mockedUseBoardState.mockReturnValue({
			board: ref<Board | undefined>(board ?? boardWithOneColumn),
			isLoading: ref(isLoading ?? false),
			createCard: createCardMock,
			createColumn: createColumnMock,
			createColumnWithCard: createColumnWithCardMock,
			deleteColumn: deleteColumnMock,
			deleteCard: deleteCardMock,
			extractCard: jest.fn(),
			fetchBoard: fetchBoardMock,
			getColumnId: jest.fn(),
			moveCard: moveCardMock,
			moveColumn: moveColumnMock,
			updateColumnTitle: updateColumnTitleMock,
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		const boardId = board?.id ?? boardWithOneColumn.id;
		wrapper = shallowMount(BoardVue, {
			...createComponentMocks({ i18n: true }),
			mocks: {
				$router,
				$route,
			},
			propsData: { boardId },
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});
	};

	describe("when component is mounted", () => {
		it("should call 'useBoardState' composable", () => {
			setup();

			expect(mockedUseBoardState).toHaveBeenCalled();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			expect(wrapper.vm.board).toStrictEqual(boardWithOneColumn);
		});

		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(BoardVue).exists()).toBeTruthy();
		});

		it("should fetch board from store and render it", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBeTruthy();
		});

		it("should fetch board from store and render one column", () => {
			setup();
			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(1);
		});

		it("should fetch board from store and render two columns", () => {
			const twoColumns = columnResponseFactory.buildList(2, { cards });
			const boardWithTwoColumns = boardResponseFactory.build({
				columns: twoColumns,
			});
			setup({ board: boardWithTwoColumns });

			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(2);
		});

		describe("BoardColumnGhost component", () => {
			describe("when user has create column permission", () => {
				it("should not be rendered on DOM", () => {
					setup();
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});

					expect(ghostColumnComponent.vm).toBeDefined();
				});
			});

			describe("when user doesn't have create column permission", () => {
				it("should not be rendered on DOM", () => {
					setup({ permissions: { hasCreateColumnPermission: false } });
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});

					expect(ghostColumnComponent.vm).not.toBeDefined();
				});
			});
		});
	});

	describe("user permissions", () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when user is not permitted to move", () => {
			it("should set lock-axis to 'x,y'", () => {
				setup({ permissions: { hasMovePermission: false } });

				const dndContainer = wrapper.findComponent({ name: "Container" });
				expect(dndContainer.element.outerHTML).toContain('lockaxis="x,y"');
			});
		});

		describe("@onCreateCard", () => {
			describe("when user is permitted to create card", () => {
				it("should call the createCard method", () => {
					setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("create:card");

					expect(createCardMock).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to create card", () => {
				it("should not call the createCard method", () => {
					setup({ permissions: { hasCreateCardPermission: false } });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("create:card");

					expect(createCardMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onCreateColumn", () => {
			describe("when user is permitted to create a column", () => {
				it("should call createColumn method", () => {
					setup();
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});
					ghostColumnComponent.vm.$emit("create:column");

					expect(createColumnMock).toHaveBeenCalled();
				});
			});
		});

		describe("@onCreateColumnWithCard", () => {
			describe("when user is permitted to create a column with card", () => {
				it("should call createColumn method", () => {
					setup();
					const ghostColumnComponent = wrapper.findComponent({
						name: "BoardColumnGhost",
					});
					ghostColumnComponent.vm.$emit("create:column-with-card");

					expect(createColumnWithCardMock).toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteCard", () => {
			describe("when user is permitted to delete a card", () => {
				it("should call deleteCard method", () => {
					setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:card");

					expect(deleteCardMock).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a card", () => {
				it("should not call deleteCard method", () => {
					setup({ permissions: { hasCreateCardPermission: false } });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:card");

					expect(deleteCardMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDeleteColumn", () => {
			describe("when user is permitted to delete a column", () => {
				it("should call deleteColumn method", () => {
					setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:column");

					expect(deleteColumnMock).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to delete a column", () => {
				it("should not call deleteColumn method", () => {
					setup({ permissions: { hasDeletePermission: false } });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("delete:column");

					expect(deleteColumnMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onDropColumn", () => {
			describe("when user is permitted to move a column", () => {
				it("should call moveColumn method", () => {
					setup();
					const containerComponent = wrapper.findComponent({
						name: "Container",
					});
					containerComponent.vm.$emit("drop");

					expect(moveColumnMock).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a column", () => {
				it("should not call moveColumn method", () => {
					setup({ permissions: { hasMovePermission: false } });
					const containerComponent = wrapper.findComponent({
						name: "Container",
					});
					containerComponent.vm.$emit("drop");

					expect(moveColumnMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateCardPosition", () => {
			describe("when user is permitted to move a card", () => {
				it("should call moveCardMock method", () => {
					setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:card-position");

					expect(moveCardMock).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to move a card", () => {
				it("should not call moveCardMock method", () => {
					setup({ permissions: { hasMovePermission: false } });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:card-position");

					expect(moveCardMock).not.toHaveBeenCalled();
				});
			});
		});

		describe("@onUpdateColumnTitle", () => {
			describe("when user is permitted to edit", () => {
				it("should call updateColumnTitle method", () => {
					setup();
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(updateColumnTitleMock).toHaveBeenCalled();
				});
			});

			describe("when user is not permitted to edit", () => {
				it("should not call updateColumnTitle method", () => {
					setup({ permissions: { hasEditPermission: false } });
					const columnComponent = wrapper.findComponent({
						name: "BoardColumn",
					});
					columnComponent.vm.$emit("update:column-title");

					expect(updateColumnTitleMock).not.toHaveBeenCalled();
				});
			});
		});
	});
});
