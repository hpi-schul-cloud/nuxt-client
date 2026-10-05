import { SchoolYearOption, TeacherOption } from "@/components/administration/ClassForm.vue";
import { RoleName } from "@api-server";
import { useSchoolStoreRefs } from "@data-app";
import { useUsersStore } from "@data-users";
import { computed } from "vue";

export const useClassFormOptions = () => {
	const usersStore = useUsersStore();
	usersStore.init(RoleName.TEACHER);

	const { schoolDetails } = useSchoolStoreRefs();

	const schoolYearOptions = computed<SchoolYearOption[]>(() => {
		const years = schoolDetails.value?.years?.schoolYears ?? [];
		return years.map((y) => ({
			title: y.name,
			value: y.id,
		}));
	});

	const activeYearId = computed<string>(() => schoolDetails.value?.years?.activeYear?.id ?? "");

	const teacherOptions = computed<TeacherOption[]>(() =>
		usersStore.userList.map((u) => ({
			title: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
			value: u._id,
		}))
	);

	const loadTeachers = async () => {
		await usersStore.fetchUsers({ $limit: 200, $skip: 0, $sort: { lastName: 1 } });
	};

	return {
		schoolYearOptions,
		activeYearId,
		teacherOptions,
		loadTeachers,
	};
};
