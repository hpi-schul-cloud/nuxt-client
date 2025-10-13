import { useBoardStore } from "./Board.store";
import { useBoardApi } from "./BoardApi.composable";
import { useSharedBoardPageInformation } from "./BoardPageInformation.composable";
import { BoardContextType } from "@/types/board/BoardContext";
import { boardResponseFactory } from "@@/tests/test-utils";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";

vi.mock("./BoardApi.composable");
const mockedUseBoardApi = vi.mocked(useBoardApi);

vi.mock("./Board.store");
const mockedUseBoardStore = vi.mocked(useBoardStore);

vi.mock(
	"@/utils/create-shared-composable",
	() =>
		({
			createTestableSharedComposable: (composable) => composable,
		}) as typeof import("@/utils/create-shared-composable")
);

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

vi.mock("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle?: string, parentTitle?: string) =>
		[pageTitle, parentTitle, "dBildungscloud"].filter(Boolean).join(" - "),
}));

describe("BoardPageInformation.composable", () => {
	let mockedBoardApiCalls: DeepMocked<ReturnType<typeof useBoardApi>>;

	beforeEach(() => {
		mockedUseBoardStore.mockReturnValue({ board: boardResponseFactory.build() } as ReturnType<typeof useBoardStore>);

		setActivePinia(createTestingPinia());

		mockedBoardApiCalls = createMock<ReturnType<typeof useBoardApi>>();
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when board context exists", () => {
		describe("when board context is a course", () => {
			const setup = () => {
				mockedBoardApiCalls.getContextInfo.mockResolvedValue({
					id: "courseId",
					type: BoardContextType.Course,
					name: "Course #1",
				});

				const { createPageInformation, breadcrumbs, contextType, pageTitle, roomId } = mountComposable(() =>
					useSharedBoardPageInformation()
				);

				return {
					createPageInformation,
					breadcrumbs,
					contextType,
					pageTitle,
					roomId,
				};
			};

			it("should return three breadcrumbs: course-overview-page > course-page > board-page", async () => {
				const { createPageInformation, breadcrumbs } = setup();

				const fakeId = "abc123-1";

				await createPageInformation(fakeId);

				expect(breadcrumbs.value).toHaveLength(3);
			});

			it("should set page title", async () => {
				const { createPageInformation, pageTitle } = setup();

				const fakeId = "abc123-2";

				await createPageInformation(fakeId);
				logger.log("pageTitle", pageTitle.value);

				expect(pageTitle.value).toContain("Course #1");
			});

			it("should set room id", async () => {
				const { createPageInformation, roomId } = setup();

				const fakeId = "abc123-2";

				await createPageInformation(fakeId);

				expect(roomId.value).toEqual("courseId");
			});

			it("should set context type", async () => {
				const { createPageInformation, contextType } = setup();

				const fakeId = "abc123-2";

				await createPageInformation(fakeId);

				expect(contextType.value).toEqual(BoardContextType.Course);
			});
		});

		describe("when board context is a room", () => {
			const setup = () => {
				mockedBoardApiCalls.getContextInfo.mockResolvedValue({
					id: "roomId",
					type: BoardContextType.Room,
					name: "Room #1",
				});

				const { createPageInformation, breadcrumbs, contextType, pageTitle, roomId } = mountComposable(() =>
					useSharedBoardPageInformation()
				);

				return {
					createPageInformation,
					breadcrumbs,
					contextType,
					pageTitle,
					roomId,
				};
			};

			it("should return three breadcrumbs: room-overview-page > room-page > board-page", async () => {
				const { createPageInformation, breadcrumbs } = setup();

				const fakeId = "abc123-1";

				await createPageInformation(fakeId);

				expect(breadcrumbs.value).toHaveLength(3);
			});

			it("should set page title", async () => {
				const { createPageInformation, pageTitle } = setup();

				const fakeId = "abc123-2";

				await createPageInformation(fakeId);

				expect(pageTitle.value).toContain("Room #1");
			});

			it("should set room id", async () => {
				const { createPageInformation, roomId } = setup();

				const fakeId = "abc123-2";

				await createPageInformation(fakeId);

				expect(roomId.value).toEqual("roomId");
			});

			it("should set context type", async () => {
				const { createPageInformation, contextType } = setup();

				const fakeId = "abc123-2";

				await createPageInformation(fakeId);

				expect(contextType.value).toEqual(BoardContextType.Room);
			});
		});
	});

	describe("when board context does not exist", () => {
		const setup = () => {
			mockedBoardApiCalls.getContextInfo.mockResolvedValue(undefined);

			const { createPageInformation, breadcrumbs, pageTitle } = mountComposable(() => useSharedBoardPageInformation());

			return { createPageInformation, breadcrumbs, pageTitle };
		};

		it("should not return breadcrumbs", async () => {
			const { createPageInformation, breadcrumbs } = setup();

			const fakeId = "abc123";

			await createPageInformation(fakeId);

			expect(breadcrumbs.value).toEqual([]);
		});

		it("should generate page title with generic fallback", async () => {
			const { createPageInformation, pageTitle } = setup();

			const fakeId = "abc123";

			await createPageInformation(fakeId);

			expect(pageTitle.value).toContain("common.labels.room");
		});
	});
});
