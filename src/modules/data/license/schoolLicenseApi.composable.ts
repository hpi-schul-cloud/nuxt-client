import { SchoolLicenseApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useSchoolLicenseApi = () => {
	const schoolLicenseApi = SchoolLicenseApiFactory(undefined, "/v3", $axios);

	const updateSchoolLicenses = async (): Promise<void> => {
		await schoolLicenseApi.schoolLicenseControllerUpdateMediaSchoolLicenses();
	};

	return {
		updateSchoolLicenses,
	};
};
