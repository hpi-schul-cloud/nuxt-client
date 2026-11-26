import { SchoolYearOption, TeacherOption } from "@/components/administration/ClassForm.vue";
import { RoleName, UserResponse } from "@api-server";
import { useAppStoreRefs, useSchoolStoreRefs } from "@data-app";
import { useUsersStore } from "@data-users";
import { computed, ref } from "vue";

export interface UserSelectOption {
	title: string;
	value: string;
}

const USERS_PAGE_SIZE = 1000;

export const useClassFormOptions = () => {
	const teachersStore = useUsersStore();
	teachersStore.init(RoleName.TEACHER);

	const { user, isAdmin } = useAppStoreRefs();
	const { schoolDetails } = useSchoolStoreRefs();
	const teachersList = ref<UserResponse[]>([]);
	const studentsList = ref<UserResponse[]>([]);

	const defaultTeacherIds = computed<string[]>(() => {
		const currentUserId = user.value?.id;
		if (!isAdmin.value && currentUserId) {
			return [currentUserId];
		}
		return [];
	});

	const schoolYearOptions = computed<SchoolYearOption[]>(() => {
		const years = schoolDetails.value?.years?.schoolYears ?? [];
		return years.map((y) => ({
			title: y.name,
			value: y.id,
		}));
	});

	const activeYearId = computed<string>(() => schoolDetails.value?.years?.activeYear?.id ?? "");

	const teacherOptions = computed<TeacherOption[]>(() => {
		const list = teachersList.value;
		return list.map((u) => ({
			title: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
			value: u._id,
		}));
	});

	const studentOptions = computed<UserSelectOption[]>(() =>
		studentsList.value.map((u) => ({
			title: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
			value: u._id,
		}))
	);

	const fetchAllUsers = async (role: RoleName.TEACHER | RoleName.STUDENT): Promise<UserResponse[]> => {
		teachersStore.init(role);

		const users: UserResponse[] = [];
		let hasMore = true;
		while (hasMore) {
			teachersStore.resetState();
			await teachersStore.fetchUsers({ $limit: USERS_PAGE_SIZE, $skip: users.length, $sort: { lastName: 1 } });

			const page = teachersStore.userList;
			users.push(...page);
			hasMore = page.length > 0 && users.length < teachersStore.pagination.total;
		}

		return users;
	};

	const loadTeachers = async () => {
		teachersList.value = await fetchAllUsers(RoleName.TEACHER);
	};

	const loadStudents = async () => {
		studentsList.value = await fetchAllUsers(RoleName.STUDENT);
	};

	return {
		schoolYearOptions,
		activeYearId,
		teacherOptions,
		studentOptions,
		defaultTeacherIds,
		loadTeachers,
		loadStudents,
		isAdmin,
	};
};
