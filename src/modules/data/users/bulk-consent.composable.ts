import { useSafeAxiosTask } from "../../../composables/async-tasks.composable";
import { UserListResponse, UserResponse } from "@/serverApi/v3/api";
import { $axios } from "@/utils/api";
import { toIsoDate } from "@/utils/date-time.utils";
import { useUsersStore } from "@data-users";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const words = [
	"auto",
	"baum",
	"bein",
	"blumen",
	"flocke",
	"frosch",
	"halsband",
	"hand",
	"haus",
	"herr",
	"horn",
	"kind",
	"kleid",
	"kobra",
	"komet",
	"konzert",
	"kopf",
	"kugel",
	"puppe",
	"rauch",
	"raupe",
	"regenbogen",
	"schuh",
	"seele",
	"spatz",
	"taktisch",
	"traum",
	"trommel",
	"wolke",
];

export type ConsentStudent = UserResponse & {
	fullName: string;
	password: string;
};

const generatePassword = (): string =>
	words[Math.floor(Math.random() * words.length)] + Math.floor(Math.random() * 9998 + 1).toString();

export const useBulkConsent = () => {
	const usersStore = useUsersStore();
	const { selectedIds } = storeToRefs(usersStore);
	const registeredStudents = ref<string[]>([]);
	const selectedStudentsData = ref<ConsentStudent[]>([]);
	const { execute } = useSafeAxiosTask();

	const register = async (payload: ConsentStudent[]) => {
		const registered: string[] = [];

		if (Array.isArray(payload)) {
			const errors: Array<{ updateError: unknown }> = [];

			for (const user of payload) {
				registered.push(user._id);
				try {
					await $axios.patch("/v1/users/admin/students/" + user._id, {
						...user,
						createAccount: true,
					});
				} catch (error) {
					errors.push({ updateError: error });
				}
			}

			registeredStudents.value = registered;
		}
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
					birthday: toIsoDate(student.birthday) ?? "",
				})
			);
	};

	const updateStudent = ({ id, birthDate, pass }: { id: string; birthDate?: string; pass?: string }) => {
		const student = selectedStudentsData.value.find((st) => st._id === id);
		if (!student) return;

		if (birthDate) student.birthday = toIsoDate(birthDate) ?? "";
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
