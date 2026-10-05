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
			value: (y as any)._id || y.id,
		}));
	});

	const activeYearId = computed<string>(() => {
		return (schoolDetails.value?.years?.activeYear as any)?._id || schoolDetails.value?.years?.activeYear?.id || "";
	});

	const teacherOptions = computed<TeacherOption[]>(() => {
		return usersStore.userList.map((u) => ({
			title: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
			value: (u as any)._id || (u as any).id,
		}));
	});

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
