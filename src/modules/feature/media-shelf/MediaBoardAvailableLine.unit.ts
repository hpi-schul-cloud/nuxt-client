import { BoardLayout } from "@/serverApi/v3";
import {
	mediaAvailableLineElementResponseFactory,
	mediaAvailableLineResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { useDragAndDrop } from "@util-board";
import { mount } from "@vue/test-utils";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { availableMediaLineId, ElementCreate } from "./data";
import MediaBoardAvailableLine from "./MediaBoardAvailableLine.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";

describe("MediaBoardAvailableLine", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardAvailableLine> = {
			line: mediaAvailableLineResponseFactory.build(),
			layout: BoardLayout.List,
		}
	) => {
		const wrapper = mount(MediaBoardAvailableLine, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					MediaBoardAvailableElement: true,
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

	it("should have the availableMediaLineId as data-line-id", async () => {
		const { wrapper } = getWrapper();

		const container = wrapper.find("[data-testid=available-line]");

		expect(container.attributes("data-line-id")).toEqual(availableMediaLineId);
	});

	describe("when dragging an element to another line", () => {
		const setup = () => {
			const availableMedium = mediaAvailableLineElementResponseFactory.build();
			const availableMedia = mediaAvailableLineResponseFactory.build({
				elements: [availableMedium],
			});

			const { wrapper } = getWrapper({
				line: availableMedia,
				layout: BoardLayout.List,
			});

			const toLineId = "toLineId";
			const fromLine = createMock<HTMLElement>({
				dataset: {
					lineId: availableMediaLineId,
				},
			});
			const toLine = createMock<HTMLElement>({
				dataset: {
					lineId: toLineId,
				},
			});
			const element = createMock<HTMLElement>({
				parentNode: createMock(),
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
				toLineId,
				availableMedium,
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

		it("should emit the create:element event", async () => {
			const { wrapper, sortableEvent, toLineId, availableMedium } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(wrapper.emitted("create:element")).toEqual<[ElementCreate][]>([
				[
					{
						oldElementIndex: 0,
						newElementIndex: 1,
						toLineId,
						schoolExternalToolId: availableMedium.schoolExternalToolId,
					},
				],
			]);
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

			expect(wrapper.emitted("create:element")).toBeUndefined();
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
				line: mediaAvailableLineResponseFactory.build(),
				layout: BoardLayout.Grid,
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
				line: mediaAvailableLineResponseFactory.build(),
				layout: BoardLayout.List,
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
});
