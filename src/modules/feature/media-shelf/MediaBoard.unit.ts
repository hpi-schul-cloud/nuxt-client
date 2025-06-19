import { MediaBoardColors } from "@/serverApi/v3";
import {
	mediaAvailableLineResponseFactory,
	mediaBoardResponseFactory,
	mediaLineResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { shallowMount } from "@vue/test-utils";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import {
	ElementCreate,
	ElementMove,
	lineLimit,
	LineMove,
	useSharedMediaBoardState,
} from "./data";
import MediaBoard from "./MediaBoard.vue";
import MediaBoardAvailableLine from "./MediaBoardAvailableLine.vue";
import MediaBoardLine from "./MediaBoardLine.vue";
import MediaBoardLineGhost from "./MediaBoardLineGhost.vue";

vi.mock("./data/mediaBoardState.composable");

describe("MediaBoard", () => {
	let useSharedMediaBoardStateMock: DeepMocked<
		ReturnType<typeof useSharedMediaBoardState>
	>;

	const getWrapper = (
		props: ComponentProps<typeof MediaBoard> = {
			board: mediaBoardResponseFactory.build(),
			availableMediaLine: mediaAvailableLineResponseFactory.build(),
		}
	) => {
		const wrapper = shallowMount(MediaBoard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					Sortable: false,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSharedMediaBoardStateMock =
			createMock<ReturnType<typeof useSharedMediaBoardState>>();

		vi.mocked(useSharedMediaBoardState).mockReturnValue(
			useSharedMediaBoardStateMock
		);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when the available line creates a new element on the board", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const createOptions: ElementCreate = {
				schoolExternalToolId: "schoolExternalToolId",
				newElementIndex: 0,
				oldElementIndex: 0,
				toLineId: "lineId",
			};

			return {
				wrapper,
				createOptions,
			};
		};

		it("should create an element in the board state", async () => {
			const { wrapper, createOptions } = setup();

			const availableLine = wrapper.findComponent(MediaBoardAvailableLine);

			availableLine.vm.$emit("create:element", createOptions);
			await nextTick();

			expect(useSharedMediaBoardStateMock.createElement).toHaveBeenCalledWith(
				createOptions
			);
		});
	});

	describe("when a available line updates its color", () => {
		it("should update the line color in the board state", async () => {
			const { wrapper } = getWrapper();

			const availableLine = wrapper.findComponent(MediaBoardAvailableLine);

			availableLine.vm.$emit(
				"update:line-background-color",
				MediaBoardColors.Red
			);
			await nextTick();

			expect(
				useSharedMediaBoardStateMock.updateAvailableLineBackgroundColor
			).toHaveBeenCalledWith(MediaBoardColors.Red);
		});
	});

	describe("when a available line updates its visibility", () => {
		it("should update the line visibility in the board state", async () => {
			const { wrapper } = getWrapper();

			const availableLine = wrapper.findComponent(MediaBoardAvailableLine);

			availableLine.vm.$emit("update:line-collapsed", true);
			await nextTick();

			expect(
				useSharedMediaBoardStateMock.updateAvailableLineCollapsed
			).toHaveBeenCalledWith(true);
		});
	});

	describe("when the ghost line creates a new line on the board", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should create an element in the board state", async () => {
			const { wrapper } = setup();

			const ghostLine = wrapper.findComponent(MediaBoardLineGhost);

			ghostLine.vm.$emit("create:line");
			await nextTick();

			expect(useSharedMediaBoardStateMock.createLine).toHaveBeenCalled();
		});
	});

	describe("when a media line updates its title", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should update the line title in the board state", async () => {
			const { wrapper } = setup();

			const mediaLine = wrapper.findComponent(MediaBoardLine);

			mediaLine.vm.$emit("update:line-title", "newTitle");
			await nextTick();

			expect(useSharedMediaBoardStateMock.updateLineTitle).toHaveBeenCalledWith(
				expect.any(String),
				"newTitle"
			);
		});
	});

	describe("when a media line updates its color", () => {
		it("should update the line color in the board state", async () => {
			const { wrapper } = getWrapper();

			const mediaLine = wrapper.findComponent(MediaBoardLine);

			mediaLine.vm.$emit("update:line-background-color", MediaBoardColors.Red);
			await nextTick();

			expect(
				useSharedMediaBoardStateMock.updateLineBackgroundColor
			).toHaveBeenCalledWith(expect.any(String), MediaBoardColors.Red);
		});
	});

	describe("when a media line updates its visibility", () => {
		it("should update the line visibility in the board state", async () => {
			const { wrapper } = getWrapper();

			const mediaLine = wrapper.findComponent(MediaBoardLine);

			mediaLine.vm.$emit("update:line-collapsed", true);
			await nextTick();

			expect(
				useSharedMediaBoardStateMock.updateLineCollapsed
			).toHaveBeenCalledWith(expect.any(String), true);
		});
	});

	describe("when a media line updates the position of a contained element", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const moveOptions: ElementMove = {
				fromLineId: "lineId1",
				toLineId: "lineId2",
				oldElementIndex: 0,
				newElementIndex: 0,
				elementId: "elementId1",
			};

			return {
				wrapper,
				moveOptions,
			};
		};

		it("should update the element position in the board state", async () => {
			const { wrapper, moveOptions } = setup();

			const mediaLine = wrapper.findComponent(MediaBoardLine);

			mediaLine.vm.$emit("update:element-position", moveOptions);
			await nextTick();

			expect(useSharedMediaBoardStateMock.moveElement).toHaveBeenCalledWith(
				moveOptions
			);
		});
	});

	describe("when a media line gets deleted", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should delete the line in the board state", async () => {
			const { wrapper } = setup();

			const mediaLine = wrapper.findComponent(MediaBoardLine);

			mediaLine.vm.$emit("delete:line", "lineId");
			await nextTick();

			expect(useSharedMediaBoardStateMock.deleteLine).toHaveBeenCalledWith(
				"lineId"
			);
		});
	});

	describe("when a media element gets deleted", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should delete the element in the board state", async () => {
			const { wrapper } = setup();

			const mediaLine = wrapper.findComponent(MediaBoardLine);

			mediaLine.vm.$emit("delete:element", "elementId");
			await nextTick();

			expect(useSharedMediaBoardStateMock.deleteElement).toHaveBeenCalledWith(
				"elementId"
			);
		});
	});

	describe("when a media line was dragged", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const lineId = "lineId";
			const sortableEvent: Partial<SortableEvent> = {
				oldIndex: 0,
				newIndex: 1,
				item: createMock<HTMLElement>({
					dataset: {
						lineId,
					},
				}),
			};

			return {
				wrapper,
				sortableEvent,
				lineId,
			};
		};

		it("should move the media line in the board state", async () => {
			const { wrapper, sortableEvent, lineId } = setup();

			const sortable = wrapper.findComponent(Sortable);

			sortable.vm.$emit("end", sortableEvent);
			await nextTick();

			expect(useSharedMediaBoardStateMock.moveLine).toHaveBeenCalledWith<
				[LineMove]
			>({
				lineId,
				oldLineIndex: 0,
				newLineIndex: 1,
			});
		});
	});

	describe("when the board has reached the line limit", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				board: mediaBoardResponseFactory.build({
					lines: mediaLineResponseFactory.buildList(lineLimit),
				}),
				availableMediaLine: mediaAvailableLineResponseFactory.build(),
			});

			return {
				wrapper,
			};
		};

		it("should hide the ghost line", async () => {
			const { wrapper } = setup();

			const ghostLine = wrapper.findComponent(MediaBoardLineGhost);

			expect(ghostLine.exists()).toEqual(false);
		});
	});
});
