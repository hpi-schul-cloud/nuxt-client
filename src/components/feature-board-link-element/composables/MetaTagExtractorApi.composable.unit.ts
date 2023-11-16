import * as serverApi from "@/serverApi/v3/api";
import { MetaTagExtractorResponse } from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useMetaTagExtractorApi } from "./MetaTagExtractorApi.composable";
import {
	i18nMock,
	mockApiResponse,
	mountComposable,
} from "@@/tests/test-utils";
import { I18N_KEY } from "@/utils/inject";

describe("useMetaTagExtractorApi", () => {
	let api: DeepMocked<serverApi.MetaTagExtractorApi>;

	beforeEach(() => {
		api = createMock<serverApi.MetaTagExtractorApi>();

		jest.spyOn(serverApi, "MetaTagExtractorApiFactory").mockReturnValue(api);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getMetaTags", () => {
		describe("when meta tags could be extracted", () => {
			describe("when meta tags are of type unknown", () => {
				const setup = () => {
					const mockedResponse: MetaTagExtractorResponse = {
						url: "",
						title: "",
						description: "",
						imageUrl: "",
						type: "unknown",
						parentTitle: "",
						parentType: "unknown",
					};

					api.metaTagExtractorControllerGetMetaTags.mockResolvedValue(
						mockApiResponse({ data: mockedResponse })
					);

					const composable = mountComposable(() => useMetaTagExtractorApi(), {
						[I18N_KEY.valueOf()]: i18nMock,
					});

					return {
						mockedResponse,
						composable,
					};
				};

				it("should be defined", () => {
					const { composable } = setup();

					expect(composable?.getMetaTags).toBeDefined();
				});

				it("should return the data", async () => {
					const { composable, mockedResponse } = setup();

					const url = "https://test.de/my-article";
					const data = await composable?.getMetaTags(url);

					expect(data).toEqual(mockedResponse);
				});
			});

			describe("when metatags are of type board", () => {
				const setup = () => {
					const mockedResponse: MetaTagExtractorResponse = {
						url: "https://test.de/my-article",
						title: "Shakespear",
						description: "",
						imageUrl: "",
						type: "board",
						parentTitle: "English",
						parentType: "course",
					};

					api.metaTagExtractorControllerGetMetaTags.mockResolvedValue(
						mockApiResponse({ data: mockedResponse })
					);

					const composable = mountComposable(() => useMetaTagExtractorApi(), {
						[I18N_KEY.valueOf()]: i18nMock,
					});

					return {
						mockedResponse,
						composable,
					};
				};

				it("should be defined", () => {
					const { composable } = setup();

					expect(composable?.getMetaTags).toBeDefined();
				});

				it("should return the correct composed title", async () => {
					const { composable } = setup();

					const url = "https://test.de/my-article";
					const data = await composable?.getMetaTags(url);

					expect(data.title).toEqual(
						"common.labels.course: English - Shakespear"
					);
				});
			});
		});

		describe("when meta tags extraction failed", () => {
			const setup = () => {
				const mockedResponse: MetaTagExtractorResponse = {
					url: "",
					title: "",
					description: "",
					imageUrl: "",
					type: "unknown",
					parentTitle: "",
					parentType: "unknown",
				};

				api.metaTagExtractorControllerGetMetaTags.mockRejectedValue(false);

				const composable = mountComposable(() => useMetaTagExtractorApi(), {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
				});

				return {
					mockedResponse,
					composable,
				};
			};

			it("should return default values", async () => {
				const { composable } = setup();

				const url = "https://test.de/my-article";
				const data = await composable?.getMetaTags(url);

				expect(data).toEqual({ url, title: "", description: "" });
			});
		});
	});
});
