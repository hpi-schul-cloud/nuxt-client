import { useSchoolLicenseApi } from "./schoolLicenseApi.composable";
import * as serverApi from "@api-server";
import { MediaSchoolLicenseListResponse } from "@api-server";
import { mediaSchoolLicenseResponseFactory, mockApi, mockApiResponse } from "@@/tests/test-utils";
import { Mocked } from "vitest";

describe("useSchoolLicenseApi", () => {
	let schoolLicenseApi: Mocked<serverApi.SchoolLicenseApiInterface>;

	beforeEach(() => {
		schoolLicenseApi = mockApi<serverApi.SchoolLicenseApiInterface>();

		vi.spyOn(serverApi, "SchoolLicenseApiFactory").mockReturnValue(schoolLicenseApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("updateSchoolLicenses", () => {
		it("should call the api", async () => {
			await useSchoolLicenseApi().updateSchoolLicenses();

			expect(schoolLicenseApi.schoolLicenseControllerUpdateMediaSchoolLicenses).toHaveBeenCalled();
		});
	});

	describe("getMediaSchoolLicensesForSchool", () => {
		const setup = () => {
			const licenses = mediaSchoolLicenseResponseFactory.buildList(3);
			const licenseList: MediaSchoolLicenseListResponse = { data: licenses };

			schoolLicenseApi.schoolLicenseControllerGetMediaSchoolLicensesForSchool.mockResolvedValueOnce(
				mockApiResponse({ data: licenseList })
			);

			return {
				licenseList,
			};
		};

		it("should call the api", async () => {
			setup();

			await useSchoolLicenseApi().getMediaSchoolLicensesForSchool();

			expect(schoolLicenseApi.schoolLicenseControllerGetMediaSchoolLicensesForSchool).toHaveBeenCalled();
		});

		it("should return licenses", async () => {
			const { licenseList } = setup();

			const result = await useSchoolLicenseApi().getMediaSchoolLicensesForSchool();

			expect(result).toEqual(licenseList);
		});
	});
});
