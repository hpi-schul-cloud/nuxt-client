import { Ref, ref, watch, computed } from "vue";
import { CoursesApiFactory } from "@/serverApi/v3/api";
import { $axios } from "@/utils/api";
import { User } from "../types/User";

export const useUserSelectorState = (courseId: Ref<string>) => {
	const users = ref<User[]>([]);
	const isLoading = ref<boolean>(false);
	const courseApi = CoursesApiFactory(undefined, "/v3", $axios);

	const fetchStudents = async (courseId: string) => {
		isLoading.value = true;
		const response = await courseApi.courseControllerGetCourseForTeacher(
			courseId
		);
		users.value = response.data.students || [];
		isLoading.value = false;
	};

	watch(
		() => courseId.value,
		(newCourseId) => {
			fetchStudents(newCourseId);
		}
	);

	const items = computed(() => {
		return users.value.map((user: User) => {
			return {
				text: user.firstName + " " + user.lastName,
				value: user.id,
			};
		});
	});

	const userIds = computed(() => {
		return users.value.map((user: User) => {
			return user.id;
		});
	});

	return {
		fetchStudents,
		users,
		userIds,
		items,
		isLoading,
	};
};
