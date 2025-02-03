import * as serverApi from "@/serverApi/v3/api";
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
});
