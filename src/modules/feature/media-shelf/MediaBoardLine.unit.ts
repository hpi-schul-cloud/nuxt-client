import { ComponentProps } from "@/types/vue";
import { mediaLineResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick, ref } from "vue";
import { availableMediaLineId, ElementMove } from "./data";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";

jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useMediaQuery: jest.fn(),
	};
});

jest.mocked(useMediaQuery).mockReturnValue(ref(true));

describe("MediaBoardLine", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardLine> = {
			line: mediaLineResponseFactory.build(),
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
		jest.resetAllMocks();
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
			const { wrapper, sortableEvent, fromLineId, toLineId, elementId } =
				setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(wrapper.emitted("update:element-position")).toEqual<
				[ElementMove][]
			>([
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

			expect(wrapper.emitted("update:element-position")).toEqual<
				[ElementMove][]
			>([
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
});