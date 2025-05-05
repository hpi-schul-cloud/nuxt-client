import { $axios } from "@/utils/api";

export const useSchoolApi = () => {
	const fetchMaintenanceStatus = async (schoolId: string) => {
		const response = await $axios.get(`/v1/schools/${schoolId}/maintenance`);

		return response.data;
	};

	const setMaintenance = async (schoolId: string, maintenance: boolean) => {
		const response = await $axios.post(`/v1/schools/${schoolId}/maintenance`, {
			maintenance,
		});

		return response.data;
	};

	return {
		fetchMaintenanceStatus,
		setMaintenance,
	};
};
