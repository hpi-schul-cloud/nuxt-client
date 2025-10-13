import { MediaSchoolLicenseListResponse, SchoolLicenseApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useSchoolLicenseApi = () => {
	const schoolLicenseApi = SchoolLicenseApiFactory(undefined, "/v3", $axios);

	const updateSchoolLicenses = async (): Promise<void> => {
		await schoolLicenseApi.schoolLicenseControllerUpdateMediaSchoolLicenses();
	};

	const getMediaSchoolLicensesForSchool = async (): Promise<MediaSchoolLicenseListResponse> => {
		const response = await schoolLicenseApi.schoolLicenseControllerGetMediaSchoolLicensesForSchool();

		return response.data;
	};

	return {
		updateSchoolLicenses,
		getMediaSchoolLicensesForSchool,
	};
};
