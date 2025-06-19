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

vi.mock("./CollaborativeTextEditorNotifications.composable");

vi.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = vi.mocked(
	mapAxiosErrorToResponseError
);

vi.mock<typeof import("@/utils/create-global-state")>(
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

describe("CollaborativeTextEditorApi Composable", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getUrl", () => {
		describe("when collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent returns successful", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType =
					serverApi.CollaborativeTextEditorParentType.ContentElement;

				const response = createMock<
					AxiosResponse<serverApi.CollaborativeTextEditorResponse, unknown>
				>({
					data: { url: `${parentType}/${parentId}` },
				});

				const collaborativeTextEditorApi =
					createMock<serverApi.CollaborativeTextEditorApiInterface>();
				vi.spyOn(
					serverApi,
					"CollaborativeTextEditorApiFactory"
				).mockReturnValue(collaborativeTextEditorApi);
				collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent.mockResolvedValueOnce(
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

			it("should call collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent", async () => {
				const { parentId, parentType, collaborativeTextEditorApi } = setup();
				const { getUrl } = useCollaborativeTextEditorApi();

				await getUrl(parentId, parentType);

				expect(
					collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent
				).toHaveBeenCalledTimes(1);
				expect(
					collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent
				).toHaveBeenCalledWith(parentId, parentType);
			});

			it("should return url", async () => {
				const { parentId, parentType, response } = setup();
				const { getUrl } = useCollaborativeTextEditorApi();

				const url = await getUrl(parentId, parentType);

				expect(url).toEqual(response.data.url);
			});
		});

		describe("when collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent returns error", () => {
			const setup = (message?: string) => {
				const parentId = ObjectIdMock();
				const parentType =
					serverApi.CollaborativeTextEditorParentType.ContentElement;

				const { responseError, expectedPayload } = setupErrorResponse(message);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const collaborativeTextEditorApi =
					createMock<serverApi.CollaborativeTextEditorApiInterface>();
				vi.spyOn(
					serverApi,
					"CollaborativeTextEditorApiFactory"
				).mockReturnValue(collaborativeTextEditorApi);
				collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent.mockRejectedValue(
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
					showInternalServerError,
					showUnauthorizedError,
					showForbiddenError,
				};
			};

			it("should call showUnauthorizedError and pass error", async () => {
				const { parentId, parentType, showUnauthorizedError } = setup(
					ErrorType.Unauthorized
				);

				const { getUrl } = useCollaborativeTextEditorApi();

				const result = await getUrl(parentId, parentType);

				expect(result).toBeUndefined();
				expect(showUnauthorizedError).toBeCalledTimes(1);
			});

			it("should call showForbiddenError and pass error", async () => {
				const { parentId, parentType, showForbiddenError } = setup(
					ErrorType.Forbidden
				);

				const { getUrl } = useCollaborativeTextEditorApi();

				const result = await getUrl(parentId, parentType);

				expect(result).toBeUndefined();
				expect(showForbiddenError).toBeCalledTimes(1);
			});

			it("should call showInternalServerError and pass error", async () => {
				const { parentId, parentType, showInternalServerError } = setup();

				const { getUrl } = useCollaborativeTextEditorApi();

				const result = await getUrl(parentId, parentType);

				expect(result).toBeUndefined();
				expect(showInternalServerError).toBeCalledTimes(1);
			});
		});
	});
});
