import {
	mediaAvailableLineElementResponseFactory,
	mediaAvailableLineResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { shallowMount } from "@vue/test-utils";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick, ref } from "vue";
import { useDragAndDrop } from "../board/shared/DragAndDrop.composable";
import {
	availableMediaLineId,
	ElementCreate,
	useSharedMediaBoardState,
} from "./data";
import MediaBoardAvailableLine from "./MediaBoardAvailableLine.vue";

jest.mock("./data/mediaBoardState.composable");
jest.mock("@vueuse/core", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useMediaQuery: jest.fn(),
	};
});

jest.mocked(useMediaQuery).mockReturnValue(ref(true));

describe("MediaBoardAvailableLine", () => {
	let useSharedMediaBoardStateMock: DeepMocked<
		ReturnType<typeof useSharedMediaBoardState>
	>;

	const getWrapper = () => {
		const wrapper = shallowMount(MediaBoardAvailableLine, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSharedMediaBoardStateMock =
			createMock<ReturnType<typeof useSharedMediaBoardState>>();

		jest
			.mocked(useSharedMediaBoardState)
			.mockReturnValue(useSharedMediaBoardStateMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
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

			useSharedMediaBoardStateMock.availableMedia = ref(availableMedia);

			const { wrapper } = getWrapper();

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
});
