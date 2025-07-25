import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useSchoolExternalToolApi } from "./SchoolExternalToolApi.composable";
import { useSchoolExternalToolUsage } from "./SchoolExternalToolUsage.composable";
import { SchoolExternalToolMetadata } from "@/store/external-tool";
import {
	axiosErrorFactory,
	schoolExternalToolMetadataFactory,
} from "@@/tests/test-utils";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { BusinessError } from "@/store/types/commons";

vi.mock("@data-external-tool/SchoolExternalToolApi.composable");

describe("SchoolExternalToolUsage.composable", () => {
	let useSchoolExternalToolApiMock: DeepMocked<
		ReturnType<typeof useSchoolExternalToolApi>
	>;

	beforeEach(() => {
		useSchoolExternalToolApiMock =
			createMock<ReturnType<typeof useSchoolExternalToolApi>>();

		vi.mocked(useSchoolExternalToolApi).mockReturnValue(
			useSchoolExternalToolApiMock
		);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchSchoolExternalToolMetadata", () => {
		describe("when fetching metadata", () => {
			const setup = () => {
				const response: SchoolExternalToolMetadata =
					schoolExternalToolMetadataFactory.build();

				useSchoolExternalToolApiMock.fetchSchoolExternalToolMetadata.mockResolvedValue(
					response
				);

				return {
					...useSchoolExternalToolUsage(),
					response,
				};
			};

			it("should load the metadata from the api", async () => {
				const { fetchSchoolExternalToolUsage } = setup();

				await fetchSchoolExternalToolUsage("schoolExternalToolId");

				expect(
					useSchoolExternalToolApiMock.fetchSchoolExternalToolMetadata
				).toHaveBeenCalledWith("schoolExternalToolId");
			});

			it("should not have an error", async () => {
				const { fetchSchoolExternalToolUsage, error } = setup();

				await fetchSchoolExternalToolUsage("contextExternalToolId");

				expect(error.value).toBeUndefined();
			});
		});

		describe("when an error occurs", () => {
			const setup = () => {
				const axiosError = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(axiosError);

				useSchoolExternalToolApiMock.fetchSchoolExternalToolMetadata.mockRejectedValue(
					axiosError
				);

				return {
					...useSchoolExternalToolUsage(),
					apiError,
				};
			};

			it("should get error from api", async () => {
				const { fetchSchoolExternalToolUsage, error, apiError } = setup();

				await fetchSchoolExternalToolUsage("contextExternalToolId");

				expect(error.value).toEqual<BusinessError>({
					message: apiError.message,
					statusCode: apiError.code,
					error: apiError,
				});
			});
		});
	});
});
