import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { RoleName, UserResponse } from "@/serverApi/v3/api";
import { $axios } from "@/utils/api";
import { notifySuccess } from "@data-app";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export type UserCreatingData = {
	firstName: string;
	lastName: string;
	email: string;
	roles: [RoleName.Teacher] | [RoleName.Student];
	schoolId: string | undefined;
	sendRegistration: boolean;
	generateRegistrationLink?: boolean;
	birthday?: Date;
};

export const useUsers = (userType: RoleName.Student | RoleName.Teacher = RoleName.Student) => {
	const usersApi = "/v3/users/admin/" + (userType === RoleName.Student ? "students" : "teachers");
	const usersApiV1 = "/v1/users/admin/" + (userType === RoleName.Student ? "students" : "teachers");
	const registrationLinksApi = "/v1/users/mail/registrationLink";
	const registrationQrApi = "/v1/users/qrRegistrationLink";

	const { t } = useI18n();

	const userList = ref<UserResponse[]>([]);
	const deletingProgress: Ref<{ delete: { active: boolean; percent: number } }> = ref({
		delete: { active: false, percent: 0 },
	});
	const qrLinks = ref([]);
	const consentList = ref([]);
	const registrationLinks = ref([]);

	const { execute } = useSafeAxiosTask();

	const fetchUsers = async (query: { $limit: number; $skip: number; $sort: object }) => {
		const { result } = await execute(() => $axios.get(usersApi, { params: query }));

		userList.value = result?.data?.data || [];
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
			await $axios.delete(`/v3/deletionRequestsPublic`, {
				params: { ids: chunkIds },
			});
			chunkIds.forEach((id) => {
				userList.value = userList.value.filter((user) => user._id !== id);
			});
			deletingProgress.value.delete.percent = percent;
		}

		deletingProgress.value.delete.active = false;
	};

	const createUser = async (userData: UserCreatingData): Promise<{ result: UserResponse | null; error: unknown }> => {
		const createUserErrorMessage =
			userType === RoleName.Student
				? t("pages.administration.students.new.error'")
				: t("pages.administration.teachers.new.error");
		const createUserSuccessMessage =
			userType === RoleName.Student
				? t("pages.administration.students.new.success")
				: t("pages.administration.teachers.new.success");

		const { result, error } = await execute(() => $axios.post(usersApiV1, userData), createUserErrorMessage);

		if (!error) {
			notifySuccess(createUserSuccessMessage);
		}

		return {
			result: result?.data,
			error,
		};
	};

	const sendRegistrationLink = async (payload: { userIds: string[]; selectionType: string }) => {
		const { result } = await execute(
			async () => $axios.post(registrationLinksApi, payload),
			t("pages.administration.sendMail.error", payload.userIds.length)
		);

		registrationLinks.value = result?.data || [];
		notifySuccess(t("pages.administration.sendMail.success", payload.userIds.length));
	};

	const getQrRegistrationLinks = async (payload: { userIds: string[]; selectionType: string }) => {
		const { result } = await execute(
			() => $axios.post(registrationQrApi, { ...payload, roleName: userType }),
			t("pages.administration.printQr.error", payload.userIds.length)
		);

		qrLinks.value = result?.data || [];
	};

	return {
		userList,
		fetchUsers,
		createUser,
		deleteUsers,
		sendRegistrationLink,
		getQrRegistrationLinks,
		deletingProgress,
		qrLinks,
		consentList,
		registrationLinks,
	};
};
