import { availableMediaLineId, ElementMove } from "./data";
import MediaBoardExternalToolDeletedElement from "./MediaBoardExternalToolDeletedElement.vue";
import MediaBoardExternalToolElement from "./MediaBoardExternalToolElement.vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { BoardLayout } from "@/serverApi/v3";
import {
	deletedElementResponseFactory,
	mediaExternalToolElementResponseFactory,
	mediaLineResponseFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { useDragAndDrop, useMediaBoardEditMode } from "@util-board";
import { mount } from "@vue/test-utils";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";

describe("MediaBoardLine", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardLine> = {
			line: mediaLineResponseFactory.build(),
			layout: BoardLayout.List,
			index: 0,
		}
	) => {
		const wrapper = mount(MediaBoardLine, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					MediaBoardLineMenu: true,
					MediaBoardExternalToolElement: true,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when rendering the line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should render the line", () => {
			const { wrapper } = setup();

			const line = wrapper.findComponent(MediaBoardLine);

			expect(line.exists()).toEqual(true);
		});
	});

	describe("when opening the menu", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should have a menu", async () => {
			const { wrapper } = setup();

			const menu = wrapper.findComponent(MediaBoardLineMenu);

			expect(menu.isVisible()).toEqual(true);
		});
	});

	describe("when renaming from the menu", () => {
		const setup = () => {
			const line = mediaLineResponseFactory.build();

			const { wrapper } = getWrapper({
				line,
				layout: BoardLayout.List,
				index: 0,
			});

			return {
				wrapper,
				line,
			};
		};

		it("should start the edit mode for the title", async () => {
			const { wrapper, line } = setup();

			const menu = wrapper.findComponent(MediaBoardLineMenu);
			menu.vm.$emit("rename-title");

			expect(useMediaBoardEditMode(line.id).isEditMode.value).toEqual(true);
		});
	});

	describe("when updating a line title", () => {
		const setup = () => {
			const { wrapper } = getWrapper();
			const newTitle = "new title";

			return {
				wrapper,
				newTitle,
			};
		};

		it("should emit the update:line-title event", async () => {
			const { wrapper, newTitle } = setup();

			const header = wrapper.findComponent(MediaBoardLineHeader);
			header.vm.$emit("update:title", newTitle);
			await nextTick();

			expect(wrapper.emitted("update:line-title")).toEqual([[newTitle]]);
		});
	});

	describe("when deleting a line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should emit the delete:line event", async () => {
			const { wrapper } = setup();

			const menu = wrapper.findComponent(MediaBoardLineMenu);
			menu.vm.$emit("delete:line", "lineId");
			await nextTick();

			expect(wrapper.emitted("delete:line")).toEqual([["lineId"]]);
		});
	});

	describe("when dragging an element to another line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const fromLineId = "fromLineId";
			const toLineId = "toLineId";
			const elementId = "elementId";
			const fromLine = createMock<HTMLElement>({
				dataset: {
					lineId: fromLineId,
				},
			});
			const toLine = createMock<HTMLElement>({
				dataset: {
					lineId: toLineId,
				},
			});
			const element = createMock<HTMLElement>({
				parentNode: createMock(),
				dataset: {
					elementId,
				},
			});
			const sortableEvent: Partial<SortableEvent> = {
				oldIndex: 0,
				newIndex: 1,
				from: fromLine,
				to: toLine,
				item: element,
			};

			return {
				wrapper,
				sortableEvent,
				fromLineId,
				toLineId,
				elementId,
				element,
			};
		};

		it("should remove the element from the line", async () => {
			const { wrapper, sortableEvent, element } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(element.parentNode?.removeChild).toHaveBeenCalled();
		});

		it("should emit the update:element-position event", async () => {
			const { wrapper, sortableEvent, fromLineId, toLineId, elementId } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(wrapper.emitted("update:element-position")).toEqual<[ElementMove][]>([
				[
					{
						oldElementIndex: 0,
						newElementIndex: 1,
						fromLineId,
						toLineId,
						elementId,
					},
				],
			]);
		});
	});

	describe("when dragging an element in the same line", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const lineId = "lineId";
			const elementId = "elementId";
			const fromLine = createMock<HTMLElement>({
				dataset: {
					lineId,
				},
			});
			const toLine = createMock<HTMLElement>({
				dataset: {
					lineId,
				},
			});
			const element = createMock<HTMLElement>({
				parentNode: createMock(),
				dataset: {
					elementId,
				},
			});
			const sortableEvent: Partial<SortableEvent> = {
				oldIndex: 0,
				newIndex: 1,
				from: fromLine,
				to: toLine,
				item: element,
			};

			return {
				wrapper,
				sortableEvent,
				lineId,
				elementId,
				element,
			};
		};

		it("should not remove the element from the line", async () => {
			const { wrapper, sortableEvent, element } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(element.parentNode?.removeChild).not.toHaveBeenCalled();
		});

		it("should emit the update:element-position event", async () => {
			const { wrapper, sortableEvent, lineId, elementId } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(wrapper.emitted("update:element-position")).toEqual<[ElementMove][]>([
				[
					{
						oldElementIndex: 0,
						newElementIndex: 1,
						fromLineId: lineId,
						toLineId: lineId,
						elementId,
					},
				],
			]);
		});
	});

	describe("when dragging an element to the available line", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				line: mediaLineResponseFactory.build(),
				layout: BoardLayout.List,
				index: 0,
			});

			const fromLineId = "fromLineId";
			const elementId = "elementId";
			const fromLine = createMock<HTMLElement>({
				dataset: {
					lineId: fromLineId,
				},
			});
			const toLine = createMock<HTMLElement>({
				dataset: {
					lineId: availableMediaLineId,
				},
			});
			const element = createMock<HTMLElement>({
				parentNode: createMock(),
				dataset: {
					elementId,
				},
			});
			const sortableEvent: Partial<SortableEvent> = {
				oldIndex: 0,
				newIndex: 1,
				from: fromLine,
				to: toLine,
				item: element,
			};

			return {
				wrapper,
				sortableEvent,
				elementId,
				element,
			};
		};

		it("should remove the element from the line", async () => {
			const { wrapper, sortableEvent, element } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(element.parentNode?.removeChild).toHaveBeenCalled();
		});

		it("should emit the delete:element event", async () => {
			const { wrapper, sortableEvent, elementId } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(wrapper.emitted("delete:element")).toEqual([[elementId]]);
		});
	});

	describe("when dragging an element to an undefined position", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const fromLine = createMock<HTMLElement>();
			const toLine = createMock<HTMLElement>();
			const element = createMock<HTMLElement>();
			const sortableEvent: Partial<SortableEvent> = {
				from: fromLine,
				to: toLine,
				item: element,
			};

			return {
				wrapper,
				sortableEvent,
			};
		};

		it("should not emit an event", async () => {
			const { wrapper, sortableEvent } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(wrapper.emitted("update:element-position")).toBeUndefined();
			expect(wrapper.emitted("delete:element")).toBeUndefined();
		});
	});

	describe("when dragging is started", () => {
		it("should set the dragging state to true", async () => {
			const { wrapper } = getWrapper();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("start");
			await nextTick();

			expect(useDragAndDrop().isDragging.value).toEqual(true);
		});
	});

	describe("when dragging is stopped", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const fromLine = createMock<HTMLElement>();
			const toLine = createMock<HTMLElement>();
			const element = createMock<HTMLElement>();
			const sortableEvent: Partial<SortableEvent> = {
				from: fromLine,
				to: toLine,
				item: element,
			};

			return {
				wrapper,
				sortableEvent,
			};
		};

		it("should set the dragging state to false", async () => {
			const { wrapper, sortableEvent } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(useDragAndDrop().isDragging.value).toEqual(false);
		});
	});

	describe("when the line is in grid layout", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				line: mediaLineResponseFactory.build(),
				layout: BoardLayout.Grid,
				index: 0,
			});

			return {
				wrapper,
			};
		};

		it("should have the flex-wrap class", () => {
			const { wrapper } = setup();

			const sortable = wrapper.findComponent(Sortable);

			expect(sortable.classes()).toContain("flex-wrap");
		});
	});

	describe("when the line is in list layout", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				line: mediaLineResponseFactory.build(),
				layout: BoardLayout.List,
				index: 0,
			});

			return {
				wrapper,
			};
		};

		it("should not have the flex-wrap class", () => {
			const { wrapper } = setup();

			const sortable = wrapper.findComponent(Sortable);

			expect(sortable.classes()).not.toContain("flex-wrap");
		});
	});

	describe("when a MediaBoardExternalToolElement gets deleted", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				line: mediaLineResponseFactory.build(),
				layout: BoardLayout.List,
				index: 0,
			});

			return {
				wrapper,
			};
		};

		it("should emit a delete event", async () => {
			const { wrapper } = setup();

			const element = wrapper.findComponent(MediaBoardExternalToolElement);
			element.vm.$emit("delete:element", "elementId");
			await nextTick();

			expect(wrapper.emitted("delete:element")).toEqual([["elementId"]]);
		});
	});

	describe("when rendering an element", () => {
		describe("when the element response is a DeletedElementResponse", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					line: mediaLineResponseFactory.build({
						elements: deletedElementResponseFactory.buildList(1),
					}),
					layout: BoardLayout.List,
					index: 0,
				});

				return {
					wrapper,
				};
			};

			it("should render the element as MediaBoardExternalToolDeletedElement", () => {
				const { wrapper } = setup();

				const deletedElement = wrapper.findComponent(MediaBoardExternalToolDeletedElement);

				expect(deletedElement.exists()).toEqual(true);
			});
		});

		describe("when the element response is a MediaExternalToolElementResponse", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					line: mediaLineResponseFactory.build({
						elements: mediaExternalToolElementResponseFactory.buildList(1),
					}),
					layout: BoardLayout.List,
					index: 0,
				});

				return {
					wrapper,
				};
			};

			it("should render the element as MediaBoardExternalToolElement", () => {
				const { wrapper } = setup();

				const externalToolElement = wrapper.findComponent(MediaBoardExternalToolElement);

				expect(externalToolElement.exists()).toEqual(true);
			});
		});
	});
});
