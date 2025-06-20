import { BoardLayout } from "@/serverApi/v3";
import {
	mediaAvailableLineResponseFactory,
	mediaBoardResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { MediaBoard, useSharedMediaBoardState } from "@feature-media-shelf";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { ref } from "vue";
import MediaShelfPage from "./MediaShelf.page.vue";

vi.mock("@feature-media-shelf", () => {
	return {
		...vi.importActual("@feature-media-shelf"),
		useSharedMediaBoardState: vi.fn(),
	};
});

vi.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("MediaShelfPage", () => {
	let useSharedMediaBoardStateMock: DeepMocked<
		ReturnType<typeof useSharedMediaBoardState>
	>;

	const getWrapper = () => {
		const wrapper = mount(MediaShelfPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					DefaultWireframe: true,
					MediaBoard: true,
				},
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSharedMediaBoardStateMock = createMock<
			ReturnType<typeof useSharedMediaBoardState>
		>({
			isLoading: ref(false),
			isBoardOperationLoading: ref(false),
			mediaBoard: ref(mediaBoardResponseFactory.build()),
			availableMediaLine: ref(mediaAvailableLineResponseFactory.build()),
		});

		vi.mocked(useSharedMediaBoardState).mockReturnValue(
			useSharedMediaBoardStateMock
		);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when the page is loading", () => {
		const setup = async () => {
			useSharedMediaBoardStateMock.mediaBoard.value = undefined;
			useSharedMediaBoardStateMock.availableMediaLine.value = undefined;
			useSharedMediaBoardStateMock.isLoading.value = true;

			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display skeleton loader", async () => {
			const { wrapper } = await setup();

			const skeletonLoader = wrapper.find("[data-testid=skeleton-loader]");

			expect(skeletonLoader.exists()).toBe(true);
		});
	});

	describe("when the page is loaded", () => {
		const setup = async () => {
			const { wrapper } = getWrapper();

			await flushPromises();

			return {
				wrapper,
			};
		};

		it("should load the media board", async () => {
			await setup();

			expect(
				useSharedMediaBoardStateMock.fetchMediaBoardForUser
			).toHaveBeenCalled();
		});

		it("should load the available line", async () => {
			await setup();

			expect(
				useSharedMediaBoardStateMock.fetchAvailableMedia
			).toHaveBeenCalled();
		});

		it("should display the media board", async () => {
			const { wrapper } = await setup();

			const board = wrapper.findComponent(MediaBoard);

			expect(board.isVisible()).toEqual(true);
		});
	});

	describe("when the page is loaded and there are no media elements", () => {
		const setup = async () => {
			useSharedMediaBoardStateMock.availableMediaLine.value =
				mediaAvailableLineResponseFactory.build({ elements: [] });
			useSharedMediaBoardStateMock.mediaBoard.value =
				mediaBoardResponseFactory.build({
					lines: [],
				});

			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should display empty state", async () => {
			const { wrapper } = await setup();

			const emptyState = wrapper.find("[data-testid=empty-state]");

			expect(emptyState.exists()).toBe(true);
		});
	});

	describe("Layout buttons", () => {
		describe("when changing to the grid layout", () => {
			const setup = () => {
				useSharedMediaBoardStateMock.mediaBoard.value =
					mediaBoardResponseFactory.build({
						layout: BoardLayout.List,
					});

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should change the layout in the state to grid", async () => {
				const { wrapper } = setup();

				const gridBtn = wrapper.find("[data-testid=media-board-layout-grid]");
				await gridBtn.trigger("click");

				expect(
					useSharedMediaBoardStateMock.updateMediaBoardLayout
				).toHaveBeenCalledWith(BoardLayout.Grid);
			});
		});

		describe("when changing to the list layout", () => {
			const setup = () => {
				useSharedMediaBoardStateMock.mediaBoard.value =
					mediaBoardResponseFactory.build({
						layout: BoardLayout.Grid,
					});

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should change the layout in the state to list", async () => {
				const { wrapper } = setup();

				const listBtn = wrapper.find("[data-testid=media-board-layout-list]");
				await listBtn.trigger("click");

				expect(
					useSharedMediaBoardStateMock.updateMediaBoardLayout
				).toHaveBeenCalledWith(BoardLayout.List);
			});
		});
	});
});
