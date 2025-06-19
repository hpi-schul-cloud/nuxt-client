import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	contextExternalToolFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useContextExternalToolApi } from "./contextExternalToolApi.composable";
import { useContextExternalToolState } from "./contextExternalToolState.composable";
import { ContextExternalTool } from "./types";

vi.mock("@data-external-tool/contextExternalToolApi.composable");

describe("contextExternalToolState.composable", () => {
	let useContextExternalToolApiMock: DeepMocked<
		ReturnType<typeof useContextExternalToolApi>
	>;

	beforeEach(() => {
		useContextExternalToolApiMock =
			createMock<ReturnType<typeof useContextExternalToolApi>>();

		vi.mocked(useContextExternalToolApi).mockReturnValue(
			useContextExternalToolApiMock
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { contextExternalTool } = useContextExternalToolState();

			expect(contextExternalTool.value).toBeUndefined();
		});
	});

	describe("fetchContextExternalTool", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const contextExternalTool: ContextExternalTool =
					contextExternalToolFactory.build();

				useContextExternalToolApiMock.fetchContextExternalToolCall.mockResolvedValue(
					contextExternalTool
				);

				const composable = useContextExternalToolState();

				composable.error.value = {
					statusCode: 418,
					message: "error",
				};

				return {
					contextExternalTool,
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable } = setup();

				await composable.fetchContextExternalTool("contextExternalToolId");

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api for context external tools", async () => {
				const { composable } = setup();

				await composable.fetchContextExternalTool("contextExternalToolId");

				expect(
					useContextExternalToolApiMock.fetchContextExternalToolCall
				).toHaveBeenCalledWith("contextExternalToolId");
			});

			it("should set the context external tool in the state", async () => {
				const { composable, contextExternalTool } = setup();

				await composable.fetchContextExternalTool("contextExternalToolId");

				expect(composable.contextExternalTool.value).toEqual(
					contextExternalTool
				);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useContextExternalToolApiMock.fetchContextExternalToolCall.mockRejectedValueOnce(
					errorResponse
				);

				const composable = useContextExternalToolState();

				return {
					errorResponse,
					apiError,
					composable,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchContextExternalTool("contextExternalToolId");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});
		});
	});

	describe("createContextExternalTool", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const contextExternalTool: ContextExternalTool =
					contextExternalToolFactory.build();

				useContextExternalToolApiMock.createContextExternalToolCall.mockResolvedValue(
					contextExternalTool
				);

				const composable = useContextExternalToolState();

				return {
					composable,
					contextExternalTool,
				};
			};

			it("should reset the error", async () => {
				const { composable, contextExternalTool } = setup();

				await composable.createContextExternalTool(contextExternalTool);

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api to create context external tools", async () => {
				const { composable, contextExternalTool } = setup();

				await composable.createContextExternalTool(contextExternalTool);

				expect(
					useContextExternalToolApiMock.createContextExternalToolCall
				).toHaveBeenCalledWith(contextExternalTool);
			});

			it("should return the context external tool", async () => {
				const { composable, contextExternalTool } = setup();

				const result =
					await composable.createContextExternalTool(contextExternalTool);

				expect(result).toEqual(contextExternalTool);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const contextExternalTool: ContextExternalTool =
					contextExternalToolFactory.build();
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useContextExternalToolApiMock.createContextExternalToolCall.mockRejectedValueOnce(
					errorResponse
				);

				const composable = useContextExternalToolState();

				return {
					errorResponse,
					apiError,
					composable,
					contextExternalTool,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError, contextExternalTool } = setup();

				await composable.createContextExternalTool(contextExternalTool);

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should return undefined", async () => {
				const { composable, contextExternalTool } = setup();

				const result =
					await composable.createContextExternalTool(contextExternalTool);

				expect(result).toBeUndefined();
			});
		});
	});

	describe("updateContextExternalTool", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const contextExternalTool: ContextExternalTool =
					contextExternalToolFactory.build();

				useContextExternalToolApiMock.updateContextExternalToolCall.mockResolvedValue(
					contextExternalTool
				);

				const composable = useContextExternalToolState();

				return {
					composable,
					contextExternalTool,
				};
			};

			it("should reset the error", async () => {
				const { composable, contextExternalTool } = setup();

				await composable.updateContextExternalTool(
					contextExternalTool.id,
					contextExternalTool
				);

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api to update context external tools", async () => {
				const { composable, contextExternalTool } = setup();

				await composable.updateContextExternalTool(
					contextExternalTool.id,
					contextExternalTool
				);

				expect(
					useContextExternalToolApiMock.updateContextExternalToolCall
				).toHaveBeenCalledWith(contextExternalTool.id, contextExternalTool);
			});

			it("should return the context external tool", async () => {
				const { composable, contextExternalTool } = setup();

				const result = await composable.updateContextExternalTool(
					contextExternalTool.id,
					contextExternalTool
				);

				expect(result).toEqual(contextExternalTool);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const contextExternalTool: ContextExternalTool =
					contextExternalToolFactory.build();
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useContextExternalToolApiMock.updateContextExternalToolCall.mockRejectedValueOnce(
					errorResponse
				);

				const composable = useContextExternalToolState();

				return {
					errorResponse,
					apiError,
					composable,
					contextExternalTool,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError, contextExternalTool } = setup();

				await composable.updateContextExternalTool(
					contextExternalTool.id,
					contextExternalTool
				);

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should return undefined", async () => {
				const { composable, contextExternalTool } = setup();

				const result = await composable.updateContextExternalTool(
					contextExternalTool.id,
					contextExternalTool
				);

				expect(result).toBeUndefined();
			});
		});
	});

	describe("deleteContextExternalTool", () => {
		describe("when data is loaded", () => {
			const setup = () => {
				const composable = useContextExternalToolState();

				return {
					composable,
				};
			};

			it("should reset the error", async () => {
				const { composable } = setup();

				await composable.deleteContextExternalTool("contextExternalToolId");

				expect(composable.error.value).toBeUndefined();
			});

			it("should call the api to delete context external tools", async () => {
				const { composable } = setup();

				await composable.deleteContextExternalTool("contextExternalToolId");

				expect(
					useContextExternalToolApiMock.deleteContextExternalToolCall
				).toHaveBeenCalledWith("contextExternalToolId");
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useContextExternalToolApiMock.deleteContextExternalToolCall.mockRejectedValueOnce(
					errorResponse
				);

				const composable = useContextExternalToolState();

				return {
					errorResponse,
					apiError,
					composable,
				};
			};

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.deleteContextExternalTool("contextExternalToolId");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should return undefined", async () => {
				const { composable } = setup();

				const result = await composable.deleteContextExternalTool(
					"contextExternalToolId"
				);

				expect(result).toBeUndefined();
			});
		});
	});
});
