import { ClassInfo, CourseInfo } from "./type/course-info";

export class CourseInfoMapper {
	static mapToCourseInfo(courseInfoResponse: any): CourseInfo {
		const mapped = {
			id: courseInfoResponse.id,
			name: courseInfoResponse.name,
			classes: this.mapToClassesInfos(courseInfoResponse.classIds),
			syncedGroup: courseInfoResponse.syncedGroup,
			teacherNames: courseInfoResponse.teacherNames,
		};

		return mapped;
	}

	private static mapToClassesInfos(classes: any[]): ClassInfo[] {
		const mapped = classes.map((clazz: any) => {
			return this.mapToClassInfo(clazz);
		});

		return mapped;
	}

	private static mapToClassInfo(clazz: any): ClassInfo {
		const mapped = {
			id: clazz.id,
			name: clazz.name,
		};

		return mapped;
	}
}
