import { useMetaTagExtractorApi } from "./MetaTagExtractorApi.composable";
import * as serverApi from "@/serverApi/v3";
import { MetaDataEntityType, MetaTagExtractorResponse } from "@/serverApi/v3";
import { mockApi, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { Mocked } from "vitest";

describe("useMetaTagExtractorApi", () => {
	let api: Mocked<serverApi.MetaTagExtractorApi>;

	beforeEach(() => {
		api = mockApi<serverApi.MetaTagExtractorApi>();

		vi.spyOn(serverApi, "MetaTagExtractorApiFactory").mockReturnValue(api);
	});

	afterEach(() => {
		vi.clearAllMocks();
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
						originalImageUrl: "",
						type: MetaDataEntityType.UNKNOWN,
						parentTitle: "",
						parentType: MetaDataEntityType.UNKNOWN,
					};

					api.metaTagExtractorControllerGetMetaTags.mockResolvedValue(mockApiResponse({ data: mockedResponse }));

					const composable = mountComposable(() => useMetaTagExtractorApi(), {
						global: { plugins: [createTestingI18n()] },
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
				describe("when board has explicit title", () => {
					const setup = () => {
						const mockedResponse: MetaTagExtractorResponse = {
							url: "https://test.de/my-article",
							title: "Shakespear",
							description: "",
							imageUrl: "",
							originalImageUrl: "",
							type: MetaDataEntityType.BOARD,
							parentTitle: "English",
							parentType: MetaDataEntityType.COURSE,
						};

						api.metaTagExtractorControllerGetMetaTags.mockResolvedValue(mockApiResponse({ data: mockedResponse }));

						const composable = mountComposable(() => useMetaTagExtractorApi(), {
							global: { plugins: [createTestingI18n()] },
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

						expect(data.title).toEqual("common.words.board: Shakespear (English)");
					});
				});

				describe("when board has no explicit title", () => {
					const setup = () => {
						const mockedResponse: MetaTagExtractorResponse = {
							url: "https://test.de/my-article",
							title: "",
							description: "",
							imageUrl: "",
							originalImageUrl: "",
							type: MetaDataEntityType.BOARD,
							parentTitle: "English",
							parentType: MetaDataEntityType.COURSE,
						};

						api.metaTagExtractorControllerGetMetaTags.mockResolvedValue(mockApiResponse({ data: mockedResponse }));

						const composable = mountComposable(() => useMetaTagExtractorApi(), {
							global: { plugins: [createTestingI18n()] },
						});

						return {
							mockedResponse,
							composable,
						};
					};

					it("should use default fallback title", async () => {
						const { composable } = setup();

						const url = "https://test.de/my-article";
						const data = await composable?.getMetaTags(url);

						expect(data.title).toEqual("common.words.board: pages.room.boardCard.label.courseBoard (English)");
					});
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
					originalImageUrl: "",
					type: MetaDataEntityType.UNKNOWN,
					parentTitle: "",
					parentType: MetaDataEntityType.UNKNOWN,
				};

				api.metaTagExtractorControllerGetMetaTags.mockRejectedValue(false);

				const composable = mountComposable(() => useMetaTagExtractorApi(), {
					global: { plugins: [createTestingI18n()] },
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

				expect(data).toEqual({ url: "", title: "", description: "" });
			});
		});
	});
});
