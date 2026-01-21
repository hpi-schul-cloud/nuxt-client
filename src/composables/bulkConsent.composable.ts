import { inputDateFormat } from "@/plugins/datetime";
import { $axios } from "@/utils/api";
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

const generatePassword = () =>
	words[Math.floor(Math.random() * words.length)] + Math.floor(Math.random() * 9998 + 1).toString();

export interface Student {
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	birthday: string | null;
	password: string;
	consentStatus: string;
	classes: string[];
	consent?: {
		parentConsents: Array<{
			form: string;
			privacyConsent: boolean;
			termsOfUseConsent: boolean;
		}>;
	};
}

export const useBulkConsent = () => {
	// State as refs
	const selectedStudents = ref<string[]>([]);
	const registeredStudents = ref<string[]>([]);
	const selectedStudentsData = ref<Student[]>([]);
	const registerError = ref<Record<string, unknown>>({});

	// Actions
	const register = async (payload: Student[] | Student) => {
		const registered: string[] = [];

		if (Array.isArray(payload)) {
			const errors: Array<{ updateError: unknown }> = [];

			// Process each student sequentially to avoid race conditions
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

			if (errors.length > 0) {
				registerError.value = { promiseErrors: errors };
			}

			registeredStudents.value = registered;
		} else {
			registerError.value = { mapError: true };
		}
	};

	const findConsentUsers = async (query: Record<string, unknown>) => {
		query.users = selectedStudents.value;
		const response = await $axios.get(`/v3/users/admin/students`, {
			params: query,
		});

		if (!response.data?.data) {
			selectedStudentsData.value = [];
			return;
		}

		const data = response.data.data
			.filter((item: Student) => item.consentStatus !== "ok")
			.map((student: Student) => {
				student.fullName = student.firstName + " " + student.lastName;
				student.password = generatePassword();
				student.birthday = student.birthday ? inputDateFormat(student.birthday) : null;
				return student;
			});

		selectedStudentsData.value = data;
	};

	const updateStudent = (payload: { id: string; birthDate?: string; pass?: string }) => {
		const index = selectedStudentsData.value.findIndex((st) => st._id === payload.id);

		if (index !== -1 && payload.birthDate) {
			selectedStudentsData.value[index].birthday = payload.birthDate;
		}
		if (index !== -1 && payload.pass) {
			selectedStudentsData.value[index].password = payload.pass;
		}
	};

	const setStudents = (payload: Student[]) => {
		selectedStudentsData.value = payload;
	};

	const setSelectedStudents = (payload: { students: string[]; selectionType?: string }) => {
		selectedStudents.value = payload.students;
	};

	const setRegisteredStudents = (payload: string[]) => {
		registeredStudents.value = payload;
	};

	const setRegisterError = (payload: Record<string, unknown>) => {
		registerError.value = { ...payload };
	};

	// Reset function to clear all state
	const reset = () => {
		selectedStudents.value = [];
		registeredStudents.value = [];
		selectedStudentsData.value = [];
		registerError.value = {};
	};

	return {
		// State (reactive refs)
		selectedStudents,
		registeredStudents,
		selectedStudentsData,
		registerError,
		// Actions
		register,
		findConsentUsers,
		updateStudent,
		setStudents,
		setSelectedStudents,
		setRegisteredStudents,
		setRegisterError,
		reset,
	};
};
