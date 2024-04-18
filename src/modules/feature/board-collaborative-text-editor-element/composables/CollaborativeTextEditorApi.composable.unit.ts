import * as serverApi from "@/serverApi/v3/api";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
} from "@@/tests/test-utils";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { createMock } from "@golevelup/ts-jest";
import { AxiosResponse } from "axios";
import { setupCollaborativeTextEditorNotifier } from "../test-utils/collaborativeTextEditorNotifier";
import {
	ErrorType,
	useCollaborativeTextEditorApi,
} from "./CollaborativeTextEditorApi.composable";

jest.mock("./CollaborativeTextEditorNotifications.composable");

jest.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = jest.mocked(
	mapAxiosErrorToResponseError
);

jest.mock<typeof import("@/utils/create-global-state")>(
	"@/utils/create-global-state",
	() => ({
		createTestableGlobaleState: (composable) => composable,
	})
);

const setupErrorResponse = (message = "NOT_FOUND", code = 404) => {
	const expectedPayload = apiResponseErrorFactory.build({
		message,
		code,
	});
	const responseError = axiosErrorFactory.build({
		response: { data: expectedPayload },
	});

	return {
		responseError,
		expectedPayload,
	};
};

describe("FileStorageApi Composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getUrl", () => {
		describe("when collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent returns successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType =
					serverApi.CollaborativeTextEditorParentType.ContentElement;

				const response = createMock<
					AxiosResponse<serverApi.CollaborativeTextEditorResponse, any>
				>({
					data: { url: `${parentType}/${parentId}` },
				});

				const collaborativeTextEditorApi =
					createMock<serverApi.CollaborativeTextEditorApiInterface>();
				jest
					.spyOn(serverApi, "CollaborativeTextEditorApiFactory")
					.mockReturnValue(collaborativeTextEditorApi);
				collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent.mockResolvedValueOnce(
					response
				);

				setupCollaborativeTextEditorNotifier();

				return {
					parentId,
					parentType,
					response,
					collaborativeTextEditorApi,
				};
			};

			it("should call collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent", async () => {
				const { parentId, parentType, collaborativeTextEditorApi } = setup();
				const { getUrl } = useCollaborativeTextEditorApi();

				await getUrl(parentId, parentType);

				expect(
					collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent
				).toHaveBeenCalledTimes(1);
				expect(
					collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent
				).toHaveBeenCalledWith(parentId, parentType);
			});

			it("should return url", async () => {
				const { parentId, parentType, response } = setup();
				const { getUrl } = useCollaborativeTextEditorApi();

				const url = await getUrl(parentId, parentType);

				expect(url).toEqual(response.data.url);
			});
		});

		describe("when collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent returns error", () => {
			const setup = (message?: string) => {
				const parentId = ObjectIdMock();
				const parentType =
					serverApi.CollaborativeTextEditorParentType.ContentElement;

				const { responseError, expectedPayload } = setupErrorResponse(message);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const collaborativeTextEditorApi =
					createMock<serverApi.CollaborativeTextEditorApiInterface>();
				jest
					.spyOn(serverApi, "CollaborativeTextEditorApiFactory")
					.mockReturnValue(collaborativeTextEditorApi);
				collaborativeTextEditorApi.collaborativeTextEditorControllerGetCollaborativeTextEditorForParent.mockRejectedValue(
					responseError
				);

				const {
					showInternalServerError,
					showUnauthorizedError,
					showForbiddenError,
				} = setupCollaborativeTextEditorNotifier();

				return {
					parentId,
					parentType,
					responseError,
					showInternalServerError,
					showUnauthorizedError,
					showForbiddenError,
				};
			};

			it("should call showUnauthorizedError and pass error", async () => {
				const { parentId, parentType, showUnauthorizedError, responseError } =
					setup(ErrorType.Unauthorized);

				const { getUrl } = useCollaborativeTextEditorApi();

				await expect(getUrl(parentId, parentType)).rejects.toBe(responseError);
				expect(showUnauthorizedError).toBeCalledTimes(1);
			});

			it("should call showForbiddenError and pass error", async () => {
				const { parentId, parentType, showForbiddenError, responseError } =
					setup(ErrorType.Forbidden);

				const { getUrl } = useCollaborativeTextEditorApi();

				await expect(getUrl(parentId, parentType)).rejects.toBe(responseError);
				expect(showForbiddenError).toBeCalledTimes(1);
			});

			it("should call showInternalServerError and pass error", async () => {
				const { parentId, parentType, showInternalServerError, responseError } =
					setup();

				const { getUrl } = useCollaborativeTextEditorApi();

				await expect(getUrl(parentId, parentType)).rejects.toBe(responseError);
				expect(showInternalServerError).toBeCalledTimes(1);
			});
		});
	});
});
