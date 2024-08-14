import { ClassInfo } from "./type/course-info";

export class CourseInfoMapper {
	/*static mapToCourseInfo(courseInfoResponse: CourseInfoResponse): CourseInfo {
		const mapped = {
			id: courseInfoResponse.id,
			name: courseInfoResponse.name,
			classes: this.mapToClassesInfos(courseInfoResponse.classIds),
			syncedWithGroup: courseInfoResponse.syncedWithGroup ?? undefined,
			teacherNames: this.mapToTeacherNames(courseInfoResponse.teacherIds),
			isArchived: courseInfoResponse.isArchived,
		};

		return mapped;
	}*/

	private static mapToClassesInfos(classes: any[]): ClassInfo[] | undefined {
		const mapped = classes.map((clazz: any) => {
			return this.mapToClassInfo(clazz);
		});

		return mapped;
	}

	private static mapToClassInfo(clazz: any): ClassInfo {
		const mapped = {
			id: clazz.id,
		};

		return mapped;
	}

	private static mapToTeacherNames(teacherIds: any[]): string[] {
		const mapped = teacherIds.map((teacher: any) => {
			return teacher.firstName + " " + teacher.lastName;
		});

		console.log(mapped);

		return mapped;
	}
}
