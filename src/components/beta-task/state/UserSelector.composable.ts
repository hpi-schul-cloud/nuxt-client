import { Ref, ref, inject, watch, computed } from "vue";
import RoomsModule from "@/store/rooms";
import { User } from "../types/User";

export const useUserSelectorState = (courseId: Ref<string>) => {
	const isLoading = ref<boolean>(false);

	const roomsModule: RoomsModule | undefined =
		inject<RoomsModule>("roomsModule");
	if (!roomsModule) {
		throw new Error("Injection of dependencies failed");
	}

	const users = ref<User[]>([]);

	const fetchStudents = async (courseId: string) => {
		isLoading.value = true;
		await roomsModule.fetchStudents(courseId);
		users.value = roomsModule.getStudents;
		isLoading.value = false;
	};

	fetchStudents(courseId.value);

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
