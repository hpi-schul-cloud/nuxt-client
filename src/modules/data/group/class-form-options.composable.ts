import { SchoolYearOption, TeacherOption } from "@/components/administration/ClassForm.vue";
import { RoleName, UserResponse } from "@api-server";
import { useAppStoreRefs, useSchoolStoreRefs } from "@data-app";
import { useUsersStore } from "@data-users";
import { computed, ref } from "vue";

export interface UserSelectOption {
	title: string;
	value: string;
}

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
		const list = teachersList.value.length ? teachersList.value : teachersStore.userList;
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

	const loadTeachers = async () => {
		teachersStore.init(RoleName.TEACHER);
		await teachersStore.fetchUsers({ $limit: 200, $skip: 0, $sort: { lastName: 1 } });
		teachersList.value = [...teachersStore.userList];
	};

	const loadStudents = async () => {
		teachersStore.init(RoleName.STUDENT);
		await teachersStore.fetchUsers({ $limit: 1000, $skip: 0, $sort: { lastName: 1 } });
		studentsList.value = [...teachersStore.userList];
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
