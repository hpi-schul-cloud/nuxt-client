import { ErrorType, useCollaborativeTextEditorApi } from "./CollaborativeTextEditorApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { apiResponseErrorFactory, axiosErrorFactory, expectNotification } from "@@/tests/test-utils";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { useNotificationStore } from "@data-app";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosResponse } from "axios";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

vi.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = vi.mocked(mapAxiosErrorToResponseError);

vi.mock(
	"@/utils/create-global-state",
	() =>
		({
			createTestableGlobaleState: (composable) => composable,
		}) as typeof import("@/utils/create-global-state")
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

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn(() => ({
		t: vi.fn((key) => key),
	})),
}));

describe("CollaborativeTextEditorApi Composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});
	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getUrl", () => {
		describe("when collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent returns successful", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = serverApi.CollaborativeTextEditorParentType.ContentElement;

				const response = createMock<AxiosResponse<serverApi.CollaborativeTextEditorResponse, unknown>>({
					data: { url: `${parentType}/${parentId}` },
				});

				const collaborativeTextEditorApi = createMock<serverApi.CollaborativeTextEditorApiInterface>();
				vi.spyOn(serverApi, "CollaborativeTextEditorApiFactory").mockReturnValue(collaborativeTextEditorApi);
				collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent.mockResolvedValueOnce(
					response
				);

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
				const parentType = serverApi.CollaborativeTextEditorParentType.ContentElement;

				const { responseError, expectedPayload } = setupErrorResponse(message);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const collaborativeTextEditorApi = createMock<serverApi.CollaborativeTextEditorApiInterface>();
				vi.spyOn(serverApi, "CollaborativeTextEditorApiFactory").mockReturnValue(collaborativeTextEditorApi);
				collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent.mockRejectedValue(
					responseError
				);

				return {
					parentId,
					parentType,
				};
			};

			it("should call showUnauthorizedError and pass error", async () => {
				const { parentId, parentType } = setup(ErrorType.Unauthorized);

				const { getUrl } = useCollaborativeTextEditorApi();

				const result = await getUrl(parentId, parentType);

				expect(result).toBeUndefined();
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.401" })
				);
			});

			it("should call showForbiddenError and pass error", async () => {
				const { parentId, parentType } = setup(ErrorType.Forbidden);

				const { getUrl } = useCollaborativeTextEditorApi();

				const result = await getUrl(parentId, parentType);

				expect(result).toBeUndefined();
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.403" })
				);
			});

			it("should call showInternalServerError and pass error", async () => {
				const { parentId, parentType } = setup();

				const { getUrl } = useCollaborativeTextEditorApi();

				const result = await getUrl(parentId, parentType);

				expect(result).toBeUndefined();
				expectNotification("error");
			});
		});
	});
});
