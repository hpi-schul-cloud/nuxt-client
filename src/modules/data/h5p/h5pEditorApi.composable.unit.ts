import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import {
	axiosErrorFactory,
	i18nMock,
	mockApiResponse,
	mountComposable,
} from "@@/tests/test-utils";
import * as h5pApi from "@/h5pEditorApi/v3/api/h5p-editor-api";
import { H5pEditorApiInterface } from "@/h5pEditorApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useH5PEditorApi } from "@data-h5p";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { HttpStatusCode } from "axios";

describe("h5pEditorApi.composable", () => {
	let h5pEditorApi: DeepMocked<H5pEditorApiInterface>;

	const notifierModule: vi.Mocked<NotifierModule> =
		createModuleMocks(NotifierModule);

	beforeEach(() => {
		h5pEditorApi = createMock<H5pEditorApiInterface>();

		vi.spyOn(h5pApi, "H5pEditorApiFactory").mockReturnValue(h5pEditorApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getContentTitle", () => {
		const setupComposable = () => {
			const composable = mountComposable(() => useH5PEditorApi(), {
				global: {
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					},
					plugins: [createTestingI18n()],
					mocks: i18nMock,
				},
			});

			return {
				composable,
			};
		};

		describe("when the api call successfully fetches the content title", () => {
			const setup = () => {
				const { composable } = setupComposable();

				const contentId = "test-id";
				const title = "test-title";

				h5pEditorApi.h5PEditorControllerGetContentParameters.mockResolvedValueOnce(
					mockApiResponse({
						data: {
							h5p: {
								title,
							},
						},
					})
				);

				return { composable, contentId, title };
			};

			it("should return the title", async () => {
				const { composable, contentId, title } = setup();

				const result = await composable.getContentTitle(contentId);

				expect(result).toEqual(title);
			});
		});

		describe("when the api call did not return a content title", () => {
			const setup = () => {
				const { composable } = setupComposable();

				const contentId = "test-id";

				h5pEditorApi.h5PEditorControllerGetContentParameters.mockResolvedValueOnce(
					mockApiResponse({
						data: { h5p: {} },
					})
				);

				return { composable, contentId };
			};

			it("should return undefined", async () => {
				const { composable, contentId } = setup();

				const result = await composable.getContentTitle(contentId);

				expect(result).toBeUndefined();
			});
		});

		describe("when the api call fails", () => {
			const setup = () => {
				const { composable } = setupComposable();

				const contentId = "test-id";

				const error = axiosErrorFactory
					.withStatusCode(HttpStatusCode.NotFound)
					.build();

				h5pEditorApi.h5PEditorControllerGetContentParameters.mockRejectedValueOnce(
					error
				);

				return { composable, contentId };
			};

			it("should return undefined", async () => {
				const { composable, contentId } = setup();

				const result = await composable.getContentTitle(contentId);

				expect(result).toBeUndefined();
			});

			it("should show an error notification", async () => {
				const { composable, contentId } = setup();

				await composable.getContentTitle(contentId);

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "components.cardElement.h5pElement.title.error.load",
					status: "error",
				});
			});
		});
	});
});
