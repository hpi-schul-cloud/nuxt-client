import { ref } from "vue";
import { useUserSelectorState } from "./UserSelector.composable";
import * as serverApi from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";

initializeAxios({} as AxiosInstance);

const courseControllerGetCourseForTeacher = jest.fn(() => {
	const response = {
		data: {
			students: [],
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
	it("should return loading state", async () => {
		const { isLoading } = useUserSelectorState(ref("1234"));

		expect(isLoading.value).toBe(false);
	});

	it("calls API", async () => {
		const { fetchStudents } = useUserSelectorState(ref("1234"));

		await fetchStudents("1234");

		expect(apiMock.courseControllerGetCourseForTeacher).toHaveBeenCalledTimes(
			1
		);
	});
});
