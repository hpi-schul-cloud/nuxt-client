import { RoleName, UserResponse } from "@/serverApi/v3/api";
import { $axios } from "@/utils/api";
import { Ref, ref } from "vue";

export const useUsers = (userType: RoleName.Student | RoleName.Teacher = RoleName.Student) => {
	const usersApi = "/v3/users/admin/" + (userType === RoleName.Student ? "students" : "teachers");

	const usersApiV1 = "/v1/users/admin/" + (userType === RoleName.Student ? "students" : "teachers");
	const userList = ref<UserResponse[]>([]);
	const deletingProgress: Ref<{ delete: { active: boolean; percent: number } }> = ref({
		delete: { active: false, percent: 0 },
	});
	const qrLinks = ref([]);
	const consentList = ref([]);
	const registrationLinks = ref([]);

	const fetchUsers = async (query: { $limit: number; $skip: number; $sort: object }) => {
		const { data } = await $axios.get(usersApi, { params: query });

		userList.value = data.data;
	};

	const deleteUsers = async (userIds: string | string[]) => {
		deletingProgress.value.delete.active = true;
		deletingProgress.value.delete.percent = 0;

		const ids = Array.isArray(userIds) ? userIds : [userIds];
		const chunkSize = 5;
		const numChunks = Math.ceil(ids.length / chunkSize);

		for (let i = 0; i < numChunks; i++) {
			const percent = ((i + 1) * chunkSize * 100) / (numChunks * chunkSize);
			const chunkIds = ids.slice(i * chunkSize, i * chunkSize + chunkSize);
			await $axios.delete(`/v3/deletionRequestsPublic`, { params: { ids: chunkIds } });
			chunkIds.forEach((id) => {
				userList.value = userList.value.filter((user) => user._id !== id);
			});
			deletingProgress.value.delete.percent = percent;
		}

		deletingProgress.value.delete.active = false;
	};

	const findConsentUsers = async (query: { $limit: number; year: string }) => 0;
	const createTeacher = async (teacherData: { name: string; email: string; password: string }) => 0;
	const createStudent = async (studentData: { name: string; email: string; password: string }) => 0;
	const sendRegistrationLink = async (email: string) => 0;
	const getQrRegistrationLinks = async (userId: string) => 0;

	return {
		userList,
		fetchUsers,
		findConsentUsers,
		deleteUsers,
		createTeacher,
		createStudent,
		sendRegistrationLink,
		getQrRegistrationLinks,
		deletingProgress,
		qrLinks,
		consentList,
		registrationLinks,
	};
};
