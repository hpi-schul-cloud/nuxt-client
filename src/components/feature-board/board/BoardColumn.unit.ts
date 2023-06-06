import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnVue from "./BoardColumn.vue";
import { BoardPermissionsTypes } from "../types/Board";
import CardHost from "../card/CardHost.vue";
import { Container } from "vue-smooth-dnd";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import {
	cardSkeletonResponseFactory,
	columnResponseFactory,
} from "@@/tests/test-utils/factory";

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const defaultPermissions = {
	hasMovePermission: true,
	hasCreateColumnPermission: true,
};

describe("BoardColumn", () => {
	let wrapper: Wrapper<Vue>;

	const cards = cardSkeletonResponseFactory.buildList(3);
	const column = columnResponseFactory.build({
		cards,
	});

	const setup = (options?: { permissions?: BoardPermissionsTypes }) => {
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
			propsData: { column, index: 1 },
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

	describe("user permissions", () => {
		describe("when user is not permitted to move a column", () => {
			it("should set lock-axis to 'x,y", () => {
				setup({ permissions: { hasMovePermission: false } });

				const dndContainer = wrapper.findComponent({ name: "Container" });
				expect(dndContainer.element.outerHTML).toContain('lockaxis="x,y"');
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
});
