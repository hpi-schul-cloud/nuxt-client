import { ClassInfoResponse } from "@/serverApi/v3";
import { ClassInfo } from "../types/class-info";

export class GroupMapper {
	static mapToClassInfo(response: ClassInfoResponse[]): ClassInfo[] {
		const mapped: ClassInfo[] = response.map(
			(classInfoResponse: ClassInfoResponse): ClassInfo => ({
				name: classInfoResponse.name,
				externalSourceName: classInfoResponse.externalSourceName,
				teachers: classInfoResponse.teachers,
			})
		);

		return mapped;
	}
}
