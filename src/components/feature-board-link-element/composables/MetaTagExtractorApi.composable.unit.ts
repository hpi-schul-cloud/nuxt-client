import * as serverApi from "@/serverApi/v3/api";
import { MetaTagExtractorResponse } from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { useMetaTagExtractorApi } from "./MetaTagExtractorApi.composable";
import { mockApiResponse } from "@@/tests/test-utils";

describe("useMetaTagExtractorApi", () => {
	let api: DeepMocked<serverApi.MetaTagExtractorApi>;

	beforeEach(() => {
		api = createMock<serverApi.MetaTagExtractorApi>();

		jest.spyOn(serverApi, "MetaTagExtractorApiFactory").mockReturnValue(api);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = () => {
		let composable: ReturnType<typeof useMetaTagExtractorApi> | undefined;

		const TestComponent = defineComponent({
			template: "<div/>",
			setup() {
				composable = useMetaTagExtractorApi();
			},
		});

		const wrapper = mount(TestComponent, {});
		return { wrapper, composable };
	};

	describe("extractMetaTags", () => {
		describe("when meta tags could be extracted", () => {
			const setup = () => {
				const mockedResponse: MetaTagExtractorResponse = {
					url: "",
					title: "",
					description: "",
					imageUrl: "",
					type: "unknown",
				};

				api.metaTagExtractorControllerGetData.mockResolvedValue(
					mockApiResponse({ data: mockedResponse })
				);

				const { wrapper, composable } = getWrapper();

				return {
					wrapper,
					mockedResponse,
					composable,
				};
			};

			it("should be defined", () => {
				const { composable } = setup();

				expect(composable?.extractMetaTags).toBeDefined();
			});

			it("should return the data", async () => {
				const { composable, mockedResponse } = setup();

				const url = "https://test.de/my-article";
				const data = await composable?.extractMetaTags(url);

				expect(data).toEqual(mockedResponse);
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
				};

				api.metaTagExtractorControllerGetData.mockRejectedValue(false);

				const { wrapper, composable } = getWrapper();

				return {
					wrapper,
					mockedResponse,
					composable,
				};
			};

			it("should return default values", async () => {
				const { composable } = setup();

				const url = "https://test.de/my-article";
				const data = await composable?.extractMetaTags(url);

				expect(data).toEqual({ url, title: "", description: "" });
			});
		});
	});
});
