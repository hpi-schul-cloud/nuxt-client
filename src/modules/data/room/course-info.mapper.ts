import { CourseInfo } from "./type/course-info";
import { CourseInfoResponse } from "../../../serverApi/v3";

export class CourseInfoMapper {
	static mapToCourseInfo(courseInfoResponse: CourseInfoResponse): CourseInfo {
		const mapped = {
			id: courseInfoResponse.id,
			name: courseInfoResponse.name,
			classNames: courseInfoResponse.classNames,
			syncedWithGroup: courseInfoResponse.syncedGroup ?? undefined,
			teacherNames: courseInfoResponse.teacherNames,
		};

		return mapped;
	}
}
