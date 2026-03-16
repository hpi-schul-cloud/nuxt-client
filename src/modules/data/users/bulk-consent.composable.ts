import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { generatePassword } from "@/utils/pass-generation.utils";
import { UserListResponse, UserResponse } from "@api-server";
import { useUsersStore } from "@data-users";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export type ConsentStudent = UserResponse & {
	fullName: string;
	password: string;
};

export const useBulkConsent = () => {
	const usersStore = useUsersStore();
	const { selectedIds } = storeToRefs(usersStore);
	const registeredStudents = ref<string[]>([]);
	const selectedStudentsData = ref<ConsentStudent[]>([]);
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();

	const register = async (payload: ConsentStudent[]) => {
		const registered: string[] = [];

		for (const user of payload) {
			await execute(
				() =>
					$axios.patch("/v1/users/admin/students/" + user._id, {
						...user,
						createAccount: true,
					}),
				t("components.board.notifications.errors.notUpdated")
			);
			registered.push(user._id);
		}

		registeredStudents.value = registered;
	};

	const findConsentUsers = async (query: { $limit: number; $skip: number; $sort: object }) => {
		const queryWithUsers = {
			...query,
			users: selectedIds.value,
		};

		const { result } = await execute(() =>
			$axios.get<UserListResponse>("/v3/users/admin/students", { params: queryWithUsers })
		);

		if (!result?.data) {
			selectedStudentsData.value = [];
			return;
		}

		selectedStudentsData.value = result?.data.data
			.filter((item: UserResponse) => item.consentStatus !== "ok")
			.map(
				(student: UserResponse): ConsentStudent => ({
					...student,
					fullName: student.firstName + " " + student.lastName,
					password: generatePassword(),
					birthday: student.birthday,
				})
			);
	};

	const updateStudent = ({ id, birthDate, pass }: { id: string; birthDate?: string; pass?: string }) => {
		const student = selectedStudentsData.value.find((st: ConsentStudent) => st._id === id);
		if (!student) return;

		if (birthDate) student.birthday = birthDate ?? "";
		if (pass) student.password = pass;
	};

	return {
		selectedIds,
		registeredStudents,
		selectedStudentsData,
		register,
		findConsentUsers,
		updateStudent,
	};
};
