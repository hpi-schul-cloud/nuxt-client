import { SchoolApiFactory, SchoolApiInterface } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useSchoolApi = () => {
	const schoolApi: SchoolApiInterface = SchoolApiFactory(
		undefined,
		"/v3",
		$axios
	);

	const fetchMaintenanceStatus = async (schoolId: string) => {
		const response =
			await schoolApi.schoolControllerGetMaintenanceStatus(schoolId);

		return response.data;
	};

	const setMaintenance = async (schoolId: string, maintenance: boolean) => {
		const response = await schoolApi.schoolControllerSetMaintenanceStatus(
			schoolId,
			{ maintenance }
		);

		return response.data;
	};

	return {
		fetchMaintenanceStatus,
		setMaintenance,
	};
};
