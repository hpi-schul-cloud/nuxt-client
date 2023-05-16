import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnVue from "./BoardColumn.vue";
import { BoardColumn, BoardPermissionsType } from "../types/Board";
import CardHost from "../card/CardHost.vue";
import { Container } from "vue-smooth-dnd";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const defaultPermissions = {
	hasBoardMovePermission: true,
	hasBoardColumnCreatePermission: true,
};

const MOCK_PROP: BoardColumn = {
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
	title: "Col1",
	cards: [
		{ cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120004", height: 200 },
		{ cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120005", height: 250 },
		{ cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120006", height: 220 },
	],
	timestamps: {
		createdAt: new Date().toString(),
		lastUpdatedAt: new Date().toString(),
	},
};

describe("BoardColumn", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options?: { permissions?: BoardPermissionsType }) => {
		document.body.setAttribute("data-app", "true");
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		wrapper = shallowMount(BoardColumnVue as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: { column: MOCK_PROP, index: 1 },
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
				payload: MOCK_PROP.cards[0],
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
				payload: MOCK_PROP.cards[0],
				targetColumnId: MOCK_PROP.id,
				columnId: MOCK_PROP.id,
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
				payload: MOCK_PROP.cards[0],
			};
			const containerComponent = wrapper.findComponent(Container);
			containerComponent.vm.$emit("drop", emitObject);

			const emitted = wrapper.emitted("update:card-position");

			expect(emitted).toBeUndefined();
		});
	});

	describe("user permissions", () => {
		describe("when hasBoardMovePermission is set false", () => {
			it("should set lock-axis to 'x,y", () => {
				setup({ permissions: { hasBoardMovePermission: false } });

				const dndContainer = wrapper.findComponent({ name: "Container" });
				expect(dndContainer.element.outerHTML).toContain('lockaxis="x,y"');
			});
		});
		describe("when hasBoardCardCreatePermission is set false", () => {
			it("should not be rendered on DOM", () => {
				setup({ permissions: { hasBoardColumnCreatePermission: false } });

				const addCardComponent = wrapper.findAllComponents({
					name: "BoardAddCardButton",
				});

				expect(addCardComponent.length).toStrictEqual(0);
			});
		});
	});
});
