import { ref } from "vue";
import { useUserSelectorState } from "./UserSelector.composable";
import { User } from "../types/User";
import * as serverApi from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";

initializeAxios({} as AxiosInstance);

const MOCK_USERS: User[] = [
	{
		id: "userId1",
		firstName: "User",
		lastName: "1",
	},
	{
		id: "userId2",
		firstName: "User",
		lastName: "2",
	},
	{
		id: "userId3",
		firstName: "User",
		lastName: "3",
	},
];

const COURSE_ID_MOCK = "1234";

const courseControllerGetCourseForTeacher = jest.fn(() => {
	const response = {
		data: {
			students: MOCK_USERS,
		},
	};
	return response;
});

const apiMock = {
	courseControllerGetCourseForTeacher,
};
jest
	.spyOn(serverApi, "CoursesApiFactory")
	.mockReturnValue(apiMock as unknown as serverApi.CoursesApiInterface);

describe("UserSelector composable", () => {
	it("should expose loading state", async () => {
		const { isLoading } = useUserSelectorState(ref(COURSE_ID_MOCK));

		expect(isLoading.value).toBe(false);
	});

	it("should expose fetchStudents method", async () => {
		const { fetchStudents } = useUserSelectorState(ref(COURSE_ID_MOCK));

		await fetchStudents(COURSE_ID_MOCK);

		expect(apiMock.courseControllerGetCourseForTeacher).toHaveBeenCalledTimes(
			1
		);
	});

	it("should expose students info array", async () => {
		const { fetchStudents, users } = useUserSelectorState(ref(COURSE_ID_MOCK));

		expect(users.value.length).toEqual(0);
		await fetchStudents(COURSE_ID_MOCK);

		expect(users.value.length).toEqual(MOCK_USERS.length);
	});

	it("should expose students ids info array", async () => {
		const { fetchStudents, userIds } = useUserSelectorState(
			ref(COURSE_ID_MOCK)
		);

		expect(userIds.value.length).toEqual(0);
		await fetchStudents(COURSE_ID_MOCK);

		expect(userIds.value.length).toEqual(MOCK_USERS.length);
	});

	it("should expose select box items array", async () => {
		const { fetchStudents, items } = useUserSelectorState(ref(COURSE_ID_MOCK));

		expect(items.value.length).toEqual(0);
		await fetchStudents(COURSE_ID_MOCK);

		expect(items.value.length).toEqual(MOCK_USERS.length);
		expect(items.value[0].text).toEqual(
			MOCK_USERS[0].firstName + " " + MOCK_USERS[0].lastName
		);
	});
});
