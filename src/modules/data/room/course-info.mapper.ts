import { ClassInfo, CourseInfo } from "./type/course-info";

export class CourseInfoMapper {
	static mapToCourseInfo(courseInfoResponse: any): CourseInfo {
		const mapped = {
			id: courseInfoResponse.id,
			name: courseInfoResponse.name,
			classes: this.mapToClassesInfos(courseInfoResponse.classIds),
			syncedWithGroup: this.mapToClassInfo(courseInfoResponse.syncedWithGroup),
			teacherNames: this.mapToTeacherNames(courseInfoResponse.teacherNames),
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

	private static mapToTeacherNames(teachers: any[]): string[] {
		const mapped = teachers.map((teacher: any) => {
			return teacher.name;
		});

		return mapped;
	}
}
