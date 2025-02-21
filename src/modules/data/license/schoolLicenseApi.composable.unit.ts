import * as serverApi from "@/serverApi/v3/api";
import { MediaSchoolLicenseListResponse } from "@/serverApi/v3/api";
import {
	mediaSchoolLicenseResponseFactory,
	mockApiResponse,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useSchoolLicenseApi } from "./schoolLicenseApi.composable";

describe("useSchoolLicenseApi", () => {
	let schoolLicenseApi: DeepMocked<serverApi.SchoolLicenseApiInterface>;

	beforeEach(() => {
		schoolLicenseApi = createMock<serverApi.SchoolLicenseApiInterface>();

		jest
			.spyOn(serverApi, "SchoolLicenseApiFactory")
			.mockReturnValue(schoolLicenseApi);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("updateSchoolLicenses", () => {
		it("should call the api", async () => {
			await useSchoolLicenseApi().updateSchoolLicenses();

			expect(
				schoolLicenseApi.schoolLicenseControllerUpdateMediaSchoolLicenses
			).toHaveBeenCalled();
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

			expect(
				schoolLicenseApi.schoolLicenseControllerGetMediaSchoolLicensesForSchool
			).toHaveBeenCalled();
		});

		it("should return licenses", async () => {
			const { licenseList } = setup();

			const result =
				await useSchoolLicenseApi().getMediaSchoolLicensesForSchool();

			expect(result).toEqual(licenseList);
		});
	});
});
