import { mediaBoardResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { MediaBoard, useSharedMediaBoardState } from "@feature-media-shelf";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { ref } from "vue";
import MediaShelfPage from "./MediaShelf.page.vue";

jest.mock("@feature-media-shelf", () => {
	return {
		...jest.requireActual("@feature-media-shelf"),
		useSharedMediaBoardState: jest.fn(),
	};
});

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("MediaShelfPage", () => {
	let useSharedMediaBoardStateMock: DeepMocked<
		ReturnType<typeof useSharedMediaBoardState>
	>;

	const getWrapper = () => {
		const wrapper = shallowMount(MediaShelfPage, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSharedMediaBoardStateMock =
			createMock<ReturnType<typeof useSharedMediaBoardState>>();

		useSharedMediaBoardStateMock.mediaBoard = ref(
			mediaBoardResponseFactory.build()
		);

		jest
			.mocked(useSharedMediaBoardState)
			.mockReturnValue(useSharedMediaBoardStateMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
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
});
