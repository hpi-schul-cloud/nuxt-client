import { useMediaBoardApi } from "./mediaBoardApi.composable";
import { useSharedMediaBoardState as useMediaBoardState } from "./mediaBoardState.composable";
import { ApiErrorHandler, useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { BoardLayout, MediaBoardColors } from "@/serverApi/v3";
import {
	mediaAvailableLineResponseFactory,
	mediaBoardResponseFactory,
	mediaExternalToolElementResponseFactory,
	mediaLineResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useBoardNotifier } from "@util-board";

vi.mock("./mediaBoardApi.composable");
vi.mock("@/components/error-handling/ErrorHandler.composable");

vi.mock("@util-board");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

vi.mock(
	"@/utils/create-shared-composable",
	() =>
		({
			createTestableSharedComposable: (composable) => composable,
		}) as typeof import("@/utils/create-shared-composable")
);

describe("mediaBoardState.composable", () => {
	let mediaBoardApiMock: DeepMocked<ReturnType<typeof useMediaBoardApi>>;
	let useErrorHandlerMock: DeepMocked<ReturnType<typeof useErrorHandler>>;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		mediaBoardApiMock = createMock<ReturnType<typeof useMediaBoardApi>>();
		useErrorHandlerMock = createMock<ReturnType<typeof useErrorHandler>>({
			notifyWithTemplate: vi.fn().mockReturnValue(() => {
				Promise.resolve();
			}),
		});
		mockedBoardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		vi.mocked(useMediaBoardApi).mockReturnValue(mediaBoardApiMock);
		vi.mocked(useErrorHandler).mockReturnValue(useErrorHandlerMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getLineIndex", () => {
		const setup = () => {
			const lines = mediaLineResponseFactory.buildList(3);

			const composable = useMediaBoardState();
			composable.mediaBoard.value = mediaBoardResponseFactory.build({ lines });

			return {
				composable,
				lineId: lines[1].id,
			};
		};

		it("should return the index of the line", () => {
			const { composable, lineId } = setup();

			const result = composable.getLineIndex(lineId);

			expect(result).toBe(1);
		});

		it("should return -1 if the media board is undefined", () => {
			const result = useMediaBoardState().getLineIndex("lineId");

			expect(result).toBe(-1);
		});
	});

	describe("getLineIndexOfElement", () => {
		describe("when media board is undefined", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should return -1", () => {
				const { composable } = setup();

				const result = composable.getLineIndexOfElement("elementId");

				expect(result).toBe(-1);
			});
		});

		describe("when the element is not found", () => {
			const setup = () => {
				const elements = mediaExternalToolElementResponseFactory.buildList(3);
				const line1 = mediaLineResponseFactory.build({ elements });

				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line1],
				});

				return {
					composable,
				};
			};

			it("should return -1", () => {
				const { composable } = setup();

				const result = composable.getLineIndexOfElement("notExistingElementId");

				expect(result).toBe(-1);
			});
		});

		describe("when the element is found", () => {
			const setup = () => {
				const elements = mediaExternalToolElementResponseFactory.buildList(3);
				const line1 = mediaLineResponseFactory.build({ elements });
				const line2 = mediaLineResponseFactory.build();

				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line1, line2],
				});

				return {
					composable,
					elementId: elements[1].id,
					expectedLineIndex: 0,
				};
			};

			it("should return the index of the line containing the element", () => {
				const { composable, elementId, expectedLineIndex } = setup();

				const result = composable.getLineIndexOfElement(elementId);

				expect(result).toBe(expectedLineIndex);
			});
		});
	});

	describe("fetchMediaBoardForUser", () => {
		describe("when media board is fetched successfully", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const mediaBoardResponse = mediaBoardResponseFactory.build();
				mediaBoardApiMock.getMediaBoardForUser.mockResolvedValueOnce(mediaBoardResponse);

				return {
					composable,
					mediaBoardResponse,
				};
			};

			it("should call the api for the users media board", async () => {
				const { composable } = setup();

				await composable.fetchMediaBoardForUser();

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.fetchMediaBoardForUser();

				expect(composable.isLoading.value).toBe(false);
			});

			it("should set the media board", async () => {
				const { composable, mediaBoardResponse } = setup();

				await composable.fetchMediaBoardForUser();

				expect(composable.mediaBoard.value).toEqual(mediaBoardResponse);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				mediaBoardApiMock.getMediaBoardForUser.mockRejectedValueOnce("error");

				return {
					composable,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable } = setup();

				await composable.fetchMediaBoardForUser();

				/**
				 * Simulates actually calling the error handling function.
				 * (otherwise the handler function would not be called on the mock)
				 */
				useErrorHandlerMock.handleAnyError.mock.calls[0][1]();

				expect(useErrorHandlerMock.notifyWithTemplate).toHaveBeenCalledWith("notLoaded", "board");

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalledWith("error", expect.any(Function));
			});
		});
	});

	describe("updateMediaBoardLayout", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateMediaBoardLayout(BoardLayout.Grid);

				expect(mediaBoardApiMock.updateBoardLayout).not.toHaveBeenCalled();
			});
		});

		describe("when media board layout is changed", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const mediaBoardResponse = mediaBoardResponseFactory.build({
					layout: BoardLayout.List,
				});
				composable.mediaBoard.value = mediaBoardResponse;

				return {
					composable,
					mediaBoardResponse,
				};
			};

			it("should call the api to change the layout", async () => {
				const { composable, mediaBoardResponse } = setup();

				await composable.updateMediaBoardLayout(BoardLayout.Grid);

				expect(mediaBoardApiMock.updateBoardLayout).toHaveBeenCalledWith(mediaBoardResponse.id, BoardLayout.Grid);
			});

			it("should set the layout", async () => {
				const { composable } = setup();

				await composable.updateMediaBoardLayout(BoardLayout.Grid);

				expect(composable.mediaBoard.value?.layout).toEqual(BoardLayout.Grid);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const mediaBoardResponse = mediaBoardResponseFactory.build({
					layout: BoardLayout.List,
				});
				composable.mediaBoard.value = mediaBoardResponse;

				mediaBoardApiMock.updateBoardLayout.mockRejectedValueOnce("error");

				return {
					composable,
					mediaBoardResponse,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable } = setup();

				await composable.updateMediaBoardLayout(BoardLayout.List);

				/**
				 * Simulates actually calling the error handling function.
				 * (otherwise the handler function would not be called on the mock)
				 */
				useErrorHandlerMock.handleAnyError.mock.calls[0][1]();

				expect(useErrorHandlerMock.notifyWithTemplate).toHaveBeenCalledWith("notUpdated", "boardRow");

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalledWith("error", expect.any(Function));
			});
		});
	});

	describe("fetchAvailableMedia", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.fetchAvailableMedia();

				expect(mediaBoardApiMock.getAvailableMedia).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const mediaBoardResponse = mediaBoardResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponse;

				const availableLineResponse = mediaAvailableLineResponseFactory.build();
				mediaBoardApiMock.getAvailableMedia.mockResolvedValueOnce(availableLineResponse);

				return {
					composable,
					mediaBoardResponse,
					availableLineResponse,
				};
			};

			it("should call the api for the available line", async () => {
				const { composable, mediaBoardResponse } = setup();

				await composable.fetchAvailableMedia();

				expect(mediaBoardApiMock.getAvailableMedia).toHaveBeenCalledWith(mediaBoardResponse.id);
			});

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.fetchAvailableMedia();

				expect(composable.isLoading.value).toBe(false);
			});

			it("should set available media", async () => {
				const { composable, availableLineResponse } = setup();

				await composable.fetchAvailableMedia();

				expect(composable.availableMediaLine.value).toEqual(availableLineResponse);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();

				mediaBoardApiMock.getAvailableMedia.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable } = setup();

				await composable.fetchAvailableMedia();

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable } = setup();

				await composable.fetchAvailableMedia();

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("createLine", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.createLine();

				expect(mediaBoardApiMock.createLine).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const mediaBoardResponse = mediaBoardResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponse;

				const newLineResponse = mediaLineResponseFactory.build();
				mediaBoardApiMock.createLine.mockResolvedValueOnce(newLineResponse);

				composable.isBoardOperationLoading.value = true;

				return {
					composable,
					mediaBoardResponse,
					newLineResponse,
				};
			};

			it("should call the api to create a new line", async () => {
				const { composable, mediaBoardResponse } = setup();

				await composable.createLine();

				expect(mediaBoardApiMock.createLine).toHaveBeenCalledWith(mediaBoardResponse.id);
			});

			it("should exit board operation loading state", async () => {
				const { composable } = setup();

				await composable.createLine();

				expect(composable.isBoardOperationLoading.value).toBe(false);
			});

			it("should add the new line to the media board", async () => {
				const { composable, newLineResponse } = setup();

				await composable.createLine();

				expect(composable.mediaBoard.value?.lines).toContainEqual(newLineResponse);
			});

			it("should return the new line", async () => {
				const { composable, newLineResponse } = setup();

				const result = await composable.createLine();

				expect(result).toEqual(newLineResponse);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();

				mediaBoardApiMock.createLine.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable } = setup();

				await composable.createLine();

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable } = setup();

				await composable.createLine();

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("deleteLine", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.deleteLine("lineId");

				expect(mediaBoardApiMock.deleteLine).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line = mediaLineResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.deleteLine.mockResolvedValueOnce();

				return {
					composable,
					line,
				};
			};

			it("should remove the line from the media board", async () => {
				const { composable, line } = setup();

				await composable.deleteLine(line.id);

				expect(composable.mediaBoard.value?.lines).not.toContainEqual(expect.objectContaining({ id: line.id }));
			});

			it("should call the api to delete the line", async () => {
				const { composable, line } = setup();

				await composable.deleteLine(line.id);

				expect(mediaBoardApiMock.deleteLine).toHaveBeenCalledWith(line.id);
			});

			it("should exit board operation loading state", async () => {
				const { composable, line } = setup();

				await composable.deleteLine(line.id);

				expect(composable.isBoardOperationLoading.value).toBe(false);
			});

			it("should call fetchAvailableMedia", async () => {
				const { composable, line } = setup();

				await composable.deleteLine(line.id);

				expect(mediaBoardApiMock.getAvailableMedia).toHaveBeenCalledWith(composable.mediaBoard.value?.id);
			});
		});

		describe("when the line is not found", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.deleteLine("notExistingLineId");

				expect(mediaBoardApiMock.deleteLine).not.toHaveBeenCalled();
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line = mediaLineResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.deleteLine.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					lineId: line.id,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, lineId } = setup();

				await composable.deleteLine(lineId);

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, lineId } = setup();

				await composable.deleteLine(lineId);

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("moveLine", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.moveLine({
					lineId: "lineId",
					newLineIndex: 0,
					oldLineIndex: 1,
				});

				expect(mediaBoardApiMock.moveLine).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			describe("when the new position is the same as the old position", () => {
				const setup = () => {
					const composable = useMediaBoardState();

					const line1 = mediaLineResponseFactory.build();
					const line2 = mediaLineResponseFactory.build();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [line1, line2],
					});

					return {
						composable,
						line1,
					};
				};

				it("should not call the api", async () => {
					const { composable, line1 } = setup();

					await composable.moveLine({
						lineId: line1.id,
						newLineIndex: 0,
						oldLineIndex: 0,
					});

					expect(mediaBoardApiMock.moveLine).not.toHaveBeenCalled();
				});
			});

			describe("when the new position is out of bounds", () => {
				const setup = () => {
					const composable = useMediaBoardState();

					const line1 = mediaLineResponseFactory.build();
					const line2 = mediaLineResponseFactory.build();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [line1, line2],
					});

					return {
						composable,
						line1,
					};
				};

				it("should not call the api", async () => {
					const { composable, line1 } = setup();

					await composable.moveLine({
						lineId: line1.id,
						newLineIndex: 2,
						oldLineIndex: 0,
					});

					expect(mediaBoardApiMock.moveLine).not.toHaveBeenCalled();
				});
			});

			describe("when the new position is valid", () => {
				const setup = () => {
					const composable = useMediaBoardState();

					const line1 = mediaLineResponseFactory.build();
					const line2 = mediaLineResponseFactory.build();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [line1, line2],
					});

					mediaBoardApiMock.moveLine.mockResolvedValueOnce();

					return {
						composable,
						line1,
						line2,
					};
				};

				it("should move the line to the new position", async () => {
					const { composable, line1, line2 } = setup();

					await composable.moveLine({
						lineId: line1.id,
						newLineIndex: 1,
						oldLineIndex: 0,
					});

					expect(composable.mediaBoard.value?.lines).toEqual([
						expect.objectContaining({ id: line2.id }),
						expect.objectContaining({ id: line1.id }),
					]);
				});

				it("should call the api to move the line", async () => {
					const { composable, line1 } = setup();

					await composable.moveLine({
						lineId: line1.id,
						newLineIndex: 1,
						oldLineIndex: 0,
					});

					expect(mediaBoardApiMock.moveLine).toHaveBeenCalledWith(line1.id, composable.mediaBoard.value?.id, 1);
				});

				it("should exit board operation loading state", async () => {
					const { composable, line1 } = setup();

					await composable.moveLine({
						lineId: line1.id,
						newLineIndex: 1,
						oldLineIndex: 0,
					});

					expect(composable.isBoardOperationLoading.value).toBe(false);
				});
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line1 = mediaLineResponseFactory.build();
				const line2 = mediaLineResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line1, line2],
				});

				mediaBoardApiMock.moveLine.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					line1,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, line1 } = setup();

				await composable.moveLine({
					lineId: line1.id,
					newLineIndex: 1,
					oldLineIndex: 0,
				});

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, line1 } = setup();

				await composable.moveLine({
					lineId: line1.id,
					newLineIndex: 1,
					oldLineIndex: 0,
				});

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("updateLineTitle", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateLineTitle("lineId", "newTitle");

				expect(mediaBoardApiMock.updateLineTitle).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			describe("when the line is not found", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build();

					return {
						composable,
					};
				};

				it("should not call the api", async () => {
					const { composable } = setup();

					await composable.updateLineTitle("lineId", "newTitle");

					expect(mediaBoardApiMock.updateLineTitle).not.toHaveBeenCalled();
				});
			});

			describe("when the line is found", () => {
				const setup = () => {
					const composable = useMediaBoardState();

					const line = mediaLineResponseFactory.build();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [line],
					});

					mediaBoardApiMock.updateLineTitle.mockResolvedValueOnce();

					return {
						composable,
						line,
					};
				};

				it("should update the title of the line", async () => {
					const { composable, line } = setup();

					await composable.updateLineTitle(line.id, "newTitle");

					expect(composable.mediaBoard.value?.lines).toContainEqual(
						expect.objectContaining({ id: line.id, title: "newTitle" })
					);
				});

				it("should call the api to update the title of the line", async () => {
					const { composable, line } = setup();

					await composable.updateLineTitle(line.id, "newTitle");

					expect(mediaBoardApiMock.updateLineTitle).toHaveBeenCalledWith(line.id, "newTitle");
				});
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line = mediaLineResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.updateLineTitle.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					lineId: line.id,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, lineId } = setup();

				await composable.updateLineTitle(lineId, "newTitle");

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, lineId } = setup();

				await composable.updateLineTitle(lineId, "newTitle");

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("updateLineBackgroundColor", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateLineBackgroundColor("lineId", MediaBoardColors.Blue);

				expect(mediaBoardApiMock.updateLineColor).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			describe("when the line is not found", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build();

					return {
						composable,
					};
				};

				it("should not call the api", async () => {
					const { composable } = setup();

					await composable.updateLineBackgroundColor("lineId", MediaBoardColors.Blue);

					expect(mediaBoardApiMock.updateLineColor).not.toHaveBeenCalled();
				});
			});

			describe("when the line is found", () => {
				const setup = () => {
					const composable = useMediaBoardState();

					const line = mediaLineResponseFactory.build({
						backgroundColor: MediaBoardColors.Red,
					});
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [line],
					});

					return {
						composable,
						line,
					};
				};

				it("should update the color of the line", async () => {
					const { composable, line } = setup();

					await composable.updateLineBackgroundColor(line.id, MediaBoardColors.Blue);

					expect(composable.mediaBoard.value?.lines).toContainEqual(
						expect.objectContaining({
							id: line.id,
							backgroundColor: MediaBoardColors.Blue,
						})
					);
				});

				it("should call the api to update the color of the line", async () => {
					const { composable, line } = setup();

					await composable.updateLineBackgroundColor(line.id, MediaBoardColors.Blue);

					expect(mediaBoardApiMock.updateLineColor).toHaveBeenCalledWith(line.id, MediaBoardColors.Blue);
				});
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line = mediaLineResponseFactory.build({
					backgroundColor: MediaBoardColors.Red,
				});
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.updateLineColor.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					lineId: line.id,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, lineId } = setup();

				await composable.updateLineBackgroundColor(lineId, MediaBoardColors.Blue);

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, lineId } = setup();

				await composable.updateLineBackgroundColor(lineId, MediaBoardColors.Blue);

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("updateAvailableLineBackgroundColor", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;
				composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineBackgroundColor(MediaBoardColors.Blue);

				expect(mediaBoardApiMock.updateAvailableLineColor).not.toHaveBeenCalled();
			});
		});

		describe("when available line is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineBackgroundColor(MediaBoardColors.Blue);

				expect(mediaBoardApiMock.updateAvailableLineColor).not.toHaveBeenCalled();
			});
		});

		describe("when media board and available line are set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const availableLine = mediaAvailableLineResponseFactory.build({
					backgroundColor: MediaBoardColors.Red,
				});
				const mediaBoard = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = availableLine;
				composable.mediaBoard.value = mediaBoard;

				return {
					composable,
					availableLine,
					mediaBoard,
				};
			};

			it("should update the color of the line", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineBackgroundColor(MediaBoardColors.Blue);

				expect(composable.availableMediaLine.value?.backgroundColor).toEqual(MediaBoardColors.Blue);
			});

			it("should call the api to update the color of the line", async () => {
				const { composable, mediaBoard } = setup();

				await composable.updateAvailableLineBackgroundColor(MediaBoardColors.Blue);

				expect(mediaBoardApiMock.updateAvailableLineColor).toHaveBeenCalledWith(mediaBoard.id, MediaBoardColors.Blue);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const availableLine = mediaAvailableLineResponseFactory.build({
					backgroundColor: MediaBoardColors.Red,
				});
				const mediaBoard = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = availableLine;
				composable.mediaBoard.value = mediaBoard;

				mediaBoardApiMock.updateAvailableLineColor.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineBackgroundColor(MediaBoardColors.Blue);

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineBackgroundColor(MediaBoardColors.Blue);

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("updateLineCollapsed", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateLineCollapsed("lineId", true);

				expect(mediaBoardApiMock.updateLineCollapsed).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			describe("when the line is not found", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build();

					return {
						composable,
					};
				};

				it("should not call the api", async () => {
					const { composable } = setup();

					await composable.updateLineCollapsed("lineId", true);

					expect(mediaBoardApiMock.updateLineCollapsed).not.toHaveBeenCalled();
				});
			});

			describe("when the line is found", () => {
				const setup = () => {
					const composable = useMediaBoardState();

					const line = mediaLineResponseFactory.build({
						collapsed: false,
					});
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [line],
					});

					return {
						composable,
						line,
					};
				};

				it("should update the visibility of the line", async () => {
					const { composable, line } = setup();

					await composable.updateLineCollapsed(line.id, true);

					expect(composable.mediaBoard.value?.lines).toContainEqual(
						expect.objectContaining({
							id: line.id,
							collapsed: true,
						})
					);
				});

				it("should call the api to update the visibility of the line", async () => {
					const { composable, line } = setup();

					await composable.updateLineCollapsed(line.id, true);

					expect(mediaBoardApiMock.updateLineCollapsed).toHaveBeenCalledWith(line.id, true);
				});
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line = mediaLineResponseFactory.build({
					collapsed: false,
				});
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.updateLineCollapsed.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					lineId: line.id,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, lineId } = setup();

				await composable.updateLineCollapsed(lineId, true);

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, lineId } = setup();

				await composable.updateLineCollapsed(lineId, true);

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("updateAvailableLineCollapsed", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;
				composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineCollapsed(true);

				expect(mediaBoardApiMock.updateAvailableLineCollapsed).not.toHaveBeenCalled();
			});
		});

		describe("when available line is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineCollapsed(true);

				expect(mediaBoardApiMock.updateAvailableLineCollapsed).not.toHaveBeenCalled();
			});
		});

		describe("when media board and available line are set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const availableLine = mediaAvailableLineResponseFactory.build({
					collapsed: false,
				});
				const mediaBoard = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = availableLine;
				composable.mediaBoard.value = mediaBoard;

				return {
					composable,
					availableLine,
					mediaBoard,
				};
			};

			it("should update the color of the line", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineCollapsed(true);

				expect(composable.availableMediaLine.value?.collapsed).toEqual(true);
			});

			it("should call the api to update the color of the line", async () => {
				const { composable, mediaBoard } = setup();

				await composable.updateAvailableLineCollapsed(true);

				expect(mediaBoardApiMock.updateAvailableLineCollapsed).toHaveBeenCalledWith(mediaBoard.id, true);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const availableLine = mediaAvailableLineResponseFactory.build({
					collapsed: false,
				});
				const mediaBoard = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = availableLine;
				composable.mediaBoard.value = mediaBoard;

				mediaBoardApiMock.updateAvailableLineCollapsed.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineCollapsed(true);

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable } = setup();

				await composable.updateAvailableLineCollapsed(true);

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("createElement", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.createElement({
					oldElementIndex: 0,
					newElementIndex: 1,
					toLineId: "lineId",
					schoolExternalToolId: "schoolExternalToolId",
				});

				expect(mediaBoardApiMock.createElement).not.toHaveBeenCalled();
			});
		});

		describe("when available media is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();
				composable.availableMediaLine.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.createElement({
					oldElementIndex: 0,
					newElementIndex: 1,
					toLineId: "lineId",
					schoolExternalToolId: "schoolExternalToolId",
				});

				expect(mediaBoardApiMock.createElement).not.toHaveBeenCalled();
			});
		});

		describe("when media board and available media are set", () => {
			describe("when the toLineId is not set", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build();
					composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

					return {
						composable,
					};
				};

				it("should call the api to create a new line", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(mediaBoardApiMock.createLine).toHaveBeenCalledWith(composable.mediaBoard.value?.id);
				});

				it("should exit board operation loading state", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(composable.isBoardOperationLoading.value).toBe(false);
				});
			});

			describe("when the toLineId is set", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build();
					composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

					return {
						composable,
					};
				};

				it("should not call the api to create a new line", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						toLineId: "lineId",
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(mediaBoardApiMock.createLine).not.toHaveBeenCalled();
				});
			});

			describe("when new line creation fails", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [],
					});
					composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

					mediaBoardApiMock.createLine.mockRejectedValueOnce("error");
					useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
						handler()
					);
					useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
						Promise.resolve();
					});

					return {
						composable,
					};
				};

				it("should call handleAnyError", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
				});

				it("should reload board", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
				});
			});

			describe("when the element is created", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [],
					});
					composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

					const newElementResponse = mediaExternalToolElementResponseFactory.build();
					mediaBoardApiMock.createElement.mockResolvedValueOnce(newElementResponse);
					const newLine = mediaLineResponseFactory.build({ elements: [] });
					mediaBoardApiMock.createLine.mockResolvedValueOnce(newLine);

					return {
						composable,
						newElementResponse,
						newLine,
					};
				};

				it("should add the new element to the media board", async () => {
					const { composable, newElementResponse } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(composable.mediaBoard.value?.lines[0].elements).toContainEqual(newElementResponse);
				});

				it("should call the api to create a new element", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						toLineId: "lineId",
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(mediaBoardApiMock.createElement).toHaveBeenCalledWith("lineId", 1, "schoolExternalToolId");
				});

				it("should return the new element", async () => {
					const { composable, newElementResponse } = setup();

					const result = await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(result).toEqual(newElementResponse);
				});
			});

			describe("when error occurs", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build({
						lines: [],
					});
					composable.availableMediaLine.value = mediaAvailableLineResponseFactory.build();

					mediaBoardApiMock.createElement.mockRejectedValueOnce("error");
					useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
						handler()
					);
					useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
						Promise.resolve();
					});

					return {
						composable,
					};
				};

				it("should call handleAnyError", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
				});

				it("should reload board", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
				});
			});
		});
	});

	describe("deleteElement", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.deleteElement("elementId");

				expect(mediaBoardApiMock.deleteElement).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const element = mediaExternalToolElementResponseFactory.build();
				const line = mediaLineResponseFactory.build({ elements: [element] });
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.deleteElement.mockResolvedValueOnce();

				return {
					composable,
					lineId: line.id,
					elementId: element.id,
				};
			};

			it("should remove the element from the media board", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(composable.mediaBoard.value?.lines[0].elements).not.toContainEqual(
					expect.objectContaining({ id: elementId })
				);
			});

			it("should call the api to delete the element", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(mediaBoardApiMock.deleteElement).toHaveBeenCalledWith(elementId);
			});

			it("should exit board operation loading state", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(composable.isBoardOperationLoading.value).toBe(false);
			});

			it("should call fetchAvailableMedia", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(mediaBoardApiMock.getAvailableMedia).toHaveBeenCalledWith(composable.mediaBoard.value?.id);
			});
		});

		describe("when the line is not found", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.deleteElement("notExistingElementId");

				expect(mediaBoardApiMock.deleteElement).not.toHaveBeenCalled();
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const element = mediaExternalToolElementResponseFactory.build();
				const line = mediaLineResponseFactory.build({ elements: [element] });
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.deleteElement.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					elementId: element.id,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});

	describe("moveElement", () => {
		describe("when media board is not set", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = undefined;

				return {
					composable,
				};
			};

			it("should not call the api", async () => {
				const { composable } = setup();

				await composable.moveElement({
					elementId: "elementId",
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: "fromLineId",
					toLineId: "toLineId",
				});

				expect(mediaBoardApiMock.moveElement).not.toHaveBeenCalled();
			});
		});

		describe("when media board is set", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const element = mediaExternalToolElementResponseFactory.build();
				const line1 = mediaLineResponseFactory.build({ elements: [element] });
				const line2 = mediaLineResponseFactory.build({
					elements: [mediaExternalToolElementResponseFactory.build()],
				});
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line1, line2],
				});

				mediaBoardApiMock.moveElement.mockResolvedValueOnce();

				return {
					composable,
					line1,
					line2,
					element,
				};
			};

			it("should call the api to move the element", async () => {
				const { composable, line1, line2, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: line2.id,
				});

				expect(mediaBoardApiMock.moveElement).toHaveBeenCalledWith(element.id, line2.id, 1);
			});

			it("should exit board operation loading state", async () => {
				const { composable, line1, line2, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: line2.id,
				});

				expect(composable.isBoardOperationLoading.value).toBe(false);
			});

			it("should update the elements in the media board", async () => {
				const { composable, line1, line2, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: line2.id,
				});

				expect(composable.mediaBoard.value?.lines[0].elements).toHaveLength(0);
			});
		});

		describe("when element is moved to the same position", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const element = mediaExternalToolElementResponseFactory.build();
				const line = mediaLineResponseFactory.build({ elements: [element] });
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				return {
					composable,
					lineId: line.id,
					elementId: element.id,
				};
			};

			it("should not call the api", async () => {
				const { composable, lineId, elementId } = setup();

				await composable.moveElement({
					elementId,
					oldElementIndex: 0,
					newElementIndex: 0,
					fromLineId: lineId,
					toLineId: lineId,
				});

				expect(mediaBoardApiMock.moveElement).not.toHaveBeenCalled();
			});
		});

		describe("when moving element to new line", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const element = mediaExternalToolElementResponseFactory.build();
				const line1 = mediaLineResponseFactory.build({ elements: [element] });
				const line2 = mediaLineResponseFactory.build({
					elements: [mediaExternalToolElementResponseFactory.build()],
				});
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line1, line2],
				});

				mediaBoardApiMock.moveElement.mockResolvedValueOnce();

				return {
					composable,
					line1,
					line2,
					element,
				};
			};

			it("should call the api to create the new line", async () => {
				const { composable, line1, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: undefined,
				});

				expect(mediaBoardApiMock.createLine).toHaveBeenCalled();
			});

			it("should update the elements in the media board", async () => {
				const { composable, line1, line2, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: line2.id,
				});

				expect(composable.mediaBoard.value?.lines[0].elements).toHaveLength(0);
				expect(composable.mediaBoard.value?.lines[1].elements).toHaveLength(2);
			});
		});

		describe("when moving element to new line fails", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const element = mediaExternalToolElementResponseFactory.build();
				const line1 = mediaLineResponseFactory.build({ elements: [element] });
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line1],
				});

				mediaBoardApiMock.createLine.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					line1,
					element,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, line1, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: undefined,
				});

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, line1, element } = setup();

				await composable.moveElement({
					elementId: element.id,
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: line1.id,
					toLineId: undefined,
				});

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();

				const line = mediaLineResponseFactory.build();
				composable.mediaBoard.value = mediaBoardResponseFactory.build({
					lines: [line],
				});

				mediaBoardApiMock.moveElement.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce((_error: unknown, handler: ApiErrorHandler) =>
					handler()
				);
				useErrorHandlerMock.notifyWithTemplate.mockReturnValue(() => {
					Promise.resolve();
				});

				return {
					composable,
					lineId: line.id,
				};
			};

			it("should call handleAnyError", async () => {
				const { composable, lineId } = setup();

				await composable.moveElement({
					elementId: "elementId",
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: lineId,
					toLineId: lineId,
				});

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalled();
			});

			it("should reload board", async () => {
				const { composable, lineId } = setup();

				await composable.moveElement({
					elementId: "elementId",
					oldElementIndex: 0,
					newElementIndex: 1,
					fromLineId: lineId,
					toLineId: lineId,
				});

				expect(mediaBoardApiMock.getMediaBoardForUser).toHaveBeenCalled();
			});
		});
	});
});
