import { CourseInfo } from "./type";
import { CourseInfoDataResponse } from "@/serverApi/v3";

export class CourseInfoMapper {
	static mapToCourseInfo(
		courseInfoResponse: CourseInfoDataResponse
	): CourseInfo {
		const mapped = {
			id: courseInfoResponse.id,
			name: courseInfoResponse.name,
			classNames: courseInfoResponse.classNames,
			syncedWithGroup: courseInfoResponse.syncedGroup,
			teacherNames: courseInfoResponse.teacherNames,
		};

		return mapped;
	}
}
