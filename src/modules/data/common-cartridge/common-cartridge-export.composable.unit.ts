import { CommonCartridgeVersion, useCommonCartridgeExport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { vi } from "vitest";
import { mock } from "vitest-mock-extended";

describe("useCommonCartridgeExport composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.clearAllMocks();
	});

	describe("startExport", () => {
		const setup = () => {
			const { startExport } = useCommonCartridgeExport();

			const version: CommonCartridgeVersion = "1.1.0";
			const roomId = "roomId";
			const topics = ["topic1", "topic2"];
			const tasks = ["task1", "task2"];
			const columnBoards = ["board1", "board2"];

			const inputMockTopicIds = mock<HTMLInputElement>();
			const inputMockTaskIds = mock<HTMLInputElement>();
			const inputMockColumnBoardIds = mock<HTMLInputElement>();
			const formMock = mock<HTMLFormElement>();

			vi.spyOn(document, "createElement").mockReturnValueOnce(formMock);
			vi.spyOn(document, "createElement").mockReturnValueOnce(inputMockTopicIds);
			vi.spyOn(document, "createElement").mockReturnValueOnce(inputMockTaskIds);
			vi.spyOn(document, "createElement").mockReturnValueOnce(inputMockColumnBoardIds);

			const appendChildSpy = vi.spyOn(document.body, "appendChild").mockImplementationOnce(vi.fn());
			const removeChildSpy = vi.spyOn(document.body, "removeChild").mockImplementationOnce(vi.fn());

			return {
				formMock,
				appendChildSpy,
				removeChildSpy,
				inputMockTopicIds,
				inputMockTaskIds,
				inputMockColumnBoardIds,
				version,
				roomId,
				topics,
				tasks,
				columnBoards,
				startExport,
			};
		};

		describe("when called with a valid version", () => {
			it("should create a form", () => {
				const { formMock, startExport, version, roomId, topics, tasks, columnBoards } = setup();

				startExport(version, roomId, topics, tasks, columnBoards);

				expect(formMock.method).toBe("POST");
				expect(formMock.action).toBe(`/api/v3/common-cartridge/export/${roomId}?version=${version}`);
				expect(formMock.enctype).toBe("application/json");
				expect(formMock.target).toBe("_blank");
			});

			it("should create inputs with correct attributes", () => {
				const {
					inputMockTopicIds,
					inputMockTaskIds,
					inputMockColumnBoardIds,
					startExport,
					version,
					roomId,
					topics,
					tasks,
					columnBoards,
				} = setup();

				startExport(version, roomId, topics, tasks, columnBoards);

				expect(inputMockTopicIds.type).toBe("hidden");
				expect(inputMockTaskIds.type).toBe("hidden");
				expect(inputMockColumnBoardIds.type).toBe("hidden");

				expect(inputMockTopicIds.name).toBe("topics");
				expect(inputMockTaskIds.name).toBe("tasks");
				expect(inputMockColumnBoardIds.name).toBe("columnBoards");

				expect(inputMockTopicIds.value).toBe(JSON.stringify(topics));
				expect(inputMockTaskIds.value).toBe(JSON.stringify(tasks));
				expect(inputMockColumnBoardIds.value).toBe(JSON.stringify(columnBoards));
			});

			it("should append/remove form to/from body", async () => {
				const { formMock, appendChildSpy, removeChildSpy, startExport, version, roomId, topics, tasks, columnBoards } =
					setup();

				await startExport(version, roomId, topics, tasks, columnBoards);

				expect(appendChildSpy).toHaveBeenCalledWith(formMock);
				expect(removeChildSpy).toHaveBeenCalledWith(formMock);
				expect(formMock.submit).toHaveBeenCalled();
			});
		});

		describe("when called with an invalid version", () => {
			it("should throw an Error", async () => {
				const { startExport, roomId, topics, tasks, columnBoards } = setup();

				await expect(
					startExport("invalid_version" as CommonCartridgeVersion, roomId, topics, tasks, columnBoards)
				).rejects.toThrow("Invalid version");
			});
		});
	});
});
