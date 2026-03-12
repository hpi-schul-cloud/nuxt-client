import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { RoleName, UserListResponse, UserResponse } from "@/serverApi/v3/api";
import { $axios } from "@/utils/api";
import { notifySuccess } from "@data-app";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export type UserCreatingData = {
	firstName: string;
	lastName: string;
	email: string;
	roles: [RoleName.TEACHER] | [RoleName.STUDENT];
	schoolId: string;
	sendRegistration: boolean;
	generateRegistrationLink?: boolean;
	birthday?: Date;
};

export const useUsers = (userType: RoleName.STUDENT | RoleName.TEACHER) => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();

	const userTypePath = userType === RoleName.STUDENT ? "students" : "teachers";
	const usersApi = `/v3/users/admin/${userTypePath}`;
	const usersApiV1 = `/v1/users/admin/${userTypePath}`;

	const userList = ref<UserResponse[]>([]);
	const deletingProgress: Ref<{ active: boolean; percent: number }> = ref({
		active: false,
		percent: 0,
	});
	// The type of the following ref is not mirroring the full backend type but for now only what's used
	const qrLinks = ref<{ title?: string; qrContent: string }[]>([]);
	const pagination = ref({
		limit: 0,
		skip: 0,
		total: 0,
	});

	const fetchUsers = async (query: { $limit: number; $skip: number; $sort: object }) => {
		const { result } = await execute(() => $axios.get<UserListResponse>(usersApi, { params: query }));

		const { data, ...paginationResponse } = result?.data || {
			data: [],
			limit: 0,
			skip: 0,
			total: 0,
		};
		userList.value = data;
		pagination.value = paginationResponse;
	};

	const deleteUsers = async (userIds: string | string[]) => {
		deletingProgress.value.active = true;
		deletingProgress.value.percent = 0;

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
			deletingProgress.value.percent = percent;
		}

		deletingProgress.value.active = false;
	};

	const createUser = async (userData: UserCreatingData): Promise<{ result: UserResponse | null; error: unknown }> => {
		const createUserErrorMessage =
			userType === RoleName.STUDENT
				? t("pages.administration.students.new.error")
				: t("pages.administration.teachers.new.error");
		const createUserSuccessMessage =
			userType === RoleName.STUDENT
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
		const { success } = await execute(
			() => $axios.post("/v1/users/mail/registrationLink", payload),
			t("pages.administration.sendMail.error", payload.userIds.length)
		);

		if (!success) return;
		notifySuccess(t("pages.administration.sendMail.success", payload.userIds.length));
	};

	const getQrRegistrationLinks = async (payload: { userIds: string[]; selectionType: string }) => {
		const { success, result } = await execute(
			() => $axios.post("/v1/users/qrRegistrationLink", { ...payload, roleName: userType }),
			t("pages.administration.printQr.error", payload.userIds.length)
		);

		if (!success) return;
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
		pagination,
		qrLinks,
	};
};
