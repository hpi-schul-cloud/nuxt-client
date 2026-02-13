import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useCourses = () => {
	const url = "/v1/courses";
	const list = ref([]);

	const fetchCourses = async (query?: { $limit: number; year: string }) => {
		const { execute } = useSafeAxiosTask();
		const { result } = await execute(async () => await $axios.get(url, { params: query }));
		list.value = result?.data?.data || [];
	};

	const getCoursesOptions = () =>
		list.value
			.filter((course: { isArchived: boolean }) => course.isArchived === false)
			.map((course: { _id: string; name: string }) => ({
				_id: course._id,
				name: course.name,
			}));

	return { list, fetchCourses, getCoursesOptions };
};
