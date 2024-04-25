import { createMock, DeepMocked } from "@golevelup/ts-jest";
import {
	mediaAvailableLineResponseFactory,
	mediaBoardResponseFactory,
	mediaExternalToolElementResponseFactory,
	mediaLineResponseFactory,
} from "@@/tests/test-utils";
import { useSharedMediaBoardState as useMediaBoardState } from "./mediaBoardState.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { useMediaBoardApi } from "./mediaBoardApi.composable";

jest.mock("./mediaBoardApi.composable");
jest.mock("@/components/error-handling/ErrorHandler.composable");

jest.mock<typeof import("@/utils/create-shared-composable")>(
	"@/utils/create-shared-composable",
	() => ({
		createTestableSharedComposable: (composable) => composable,
	})
);

describe("mediaBoardState.composable", () => {
	let mediaBoardApiMock: DeepMocked<ReturnType<typeof useMediaBoardApi>>;
	let useErrorHandlerMock: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		mediaBoardApiMock = createMock<ReturnType<typeof useMediaBoardApi>>();
		useErrorHandlerMock = createMock<ReturnType<typeof useErrorHandler>>();

		jest.mocked(useMediaBoardApi).mockReturnValue(mediaBoardApiMock);
		jest.mocked(useErrorHandler).mockReturnValue(useErrorHandlerMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
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
				mediaBoardApiMock.getMediaBoardForUser.mockResolvedValueOnce(
					mediaBoardResponse
				);

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

				expect(useErrorHandlerMock.handleAnyError).toHaveBeenCalledWith(
					"error",
					useErrorHandlerMock.notifyWithTemplate("notLoaded", "board")
				);
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
				mediaBoardApiMock.getAvailableMedia.mockResolvedValueOnce(
					availableLineResponse
				);

				return {
					composable,
					mediaBoardResponse,
					availableLineResponse,
				};
			};

			it("should call the api for the available line", async () => {
				const { composable, mediaBoardResponse } = setup();

				await composable.fetchAvailableMedia();

				expect(mediaBoardApiMock.getAvailableMedia).toHaveBeenCalledWith(
					mediaBoardResponse.id
				);
			});

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.fetchAvailableMedia();

				expect(composable.isLoading.value).toBe(false);
			});

			it("should set available media", async () => {
				const { composable, availableLineResponse } = setup();

				await composable.fetchAvailableMedia();

				expect(composable.availableMedia.value).toEqual(availableLineResponse);
			});
		});

		describe("when error occurs", () => {
			const setup = () => {
				const composable = useMediaBoardState();
				composable.mediaBoard.value = mediaBoardResponseFactory.build();

				mediaBoardApiMock.getAvailableMedia.mockRejectedValueOnce("error");
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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

				return {
					composable,
					mediaBoardResponse,
					newLineResponse,
				};
			};

			it("should call the api to create a new line", async () => {
				const { composable, mediaBoardResponse } = setup();

				await composable.createLine();

				expect(mediaBoardApiMock.createLine).toHaveBeenCalledWith(
					mediaBoardResponse.id
				);
			});

			it("should add the new line to the media board", async () => {
				const { composable, newLineResponse } = setup();

				await composable.createLine();

				expect(composable.mediaBoard.value?.lines).toContainEqual(
					newLineResponse
				);
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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

				expect(composable.mediaBoard.value?.lines).not.toContainEqual(
					expect.objectContaining({ id: line.id })
				);
			});

			it("should call the api to delete the line", async () => {
				const { composable, line } = setup();

				await composable.deleteLine(line.id);

				expect(mediaBoardApiMock.deleteLine).toHaveBeenCalledWith(line.id);
			});

			it("should call fetchAvailableMedia", async () => {
				const { composable, line } = setup();

				await composable.deleteLine(line.id);

				expect(mediaBoardApiMock.getAvailableMedia).toHaveBeenCalledWith(
					composable.mediaBoard.value?.id
				);
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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

					expect(mediaBoardApiMock.moveLine).toHaveBeenCalledWith(
						line1.id,
						composable.mediaBoard.value?.id,
						1
					);
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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

					expect(mediaBoardApiMock.updateLineTitle).toHaveBeenCalledWith(
						line.id,
						"newTitle"
					);
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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
				composable.availableMedia.value = undefined;

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
					composable.availableMedia.value =
						mediaAvailableLineResponseFactory.build();

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

					expect(mediaBoardApiMock.createLine).toHaveBeenCalledWith(
						composable.mediaBoard.value?.id
					);
				});
			});

			describe("when the toLineId is set", () => {
				const setup = () => {
					const composable = useMediaBoardState();
					composable.mediaBoard.value = mediaBoardResponseFactory.build();
					composable.availableMedia.value =
						mediaAvailableLineResponseFactory.build();

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
					composable.availableMedia.value =
						mediaAvailableLineResponseFactory.build();

					mediaBoardApiMock.createLine.mockRejectedValueOnce("error");
					useErrorHandlerMock.handleAnyError.mockImplementationOnce(
						(_error, handler) => handler()
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
					composable.availableMedia.value =
						mediaAvailableLineResponseFactory.build();

					const newElementResponse =
						mediaExternalToolElementResponseFactory.build();
					mediaBoardApiMock.createElement.mockResolvedValueOnce(
						newElementResponse
					);
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

					expect(composable.mediaBoard.value?.lines[0].elements).toContainEqual(
						newElementResponse
					);
				});

				it("should call the api to create a new element", async () => {
					const { composable } = setup();

					await composable.createElement({
						oldElementIndex: 0,
						newElementIndex: 1,
						toLineId: "lineId",
						schoolExternalToolId: "schoolExternalToolId",
					});

					expect(mediaBoardApiMock.createElement).toHaveBeenCalledWith(
						"lineId",
						1,
						"schoolExternalToolId"
					);
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
					composable.availableMedia.value =
						mediaAvailableLineResponseFactory.build();

					mediaBoardApiMock.createElement.mockRejectedValueOnce("error");
					useErrorHandlerMock.handleAnyError.mockImplementationOnce(
						(_error, handler) => handler()
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

				expect(
					composable.mediaBoard.value?.lines[0].elements
				).not.toContainEqual(expect.objectContaining({ id: elementId }));
			});

			it("should call the api to delete the element", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(mediaBoardApiMock.deleteElement).toHaveBeenCalledWith(elementId);
			});

			it("should call fetchAvailableMedia", async () => {
				const { composable, elementId } = setup();

				await composable.deleteElement(elementId);

				expect(mediaBoardApiMock.getAvailableMedia).toHaveBeenCalledWith(
					composable.mediaBoard.value?.id
				);
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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

				expect(mediaBoardApiMock.moveElement).toHaveBeenCalledWith(
					element.id,
					line2.id,
					1
				);
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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
				useErrorHandlerMock.handleAnyError.mockImplementationOnce(
					(_error, handler) => handler()
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