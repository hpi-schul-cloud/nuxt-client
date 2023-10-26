import { ClassInfoResponse, ClassInfoResponseTypeEnum } from "@/serverApi/v3";
import { ClassInfo, ClassRootType } from "../types/class-info";

export const ClassRootTypeMapping: Record<
	ClassInfoResponseTypeEnum,
	ClassRootType
> = {
	[ClassInfoResponseTypeEnum.Class]: ClassRootType.Class,
	[ClassInfoResponseTypeEnum.Group]: ClassRootType.Group,
};

export class GroupMapper {
	static mapToClassInfo(response: ClassInfoResponse[]): ClassInfo[] {
		const mapped: ClassInfo[] = response.map(
			(classInfoResponse: ClassInfoResponse): ClassInfo => ({
				name: classInfoResponse.name,
				externalSourceName: classInfoResponse.externalSourceName,
				teachers: classInfoResponse.teachers,
				type: ClassRootTypeMapping[classInfoResponse.type],
				id: classInfoResponse.id,
				isUpgradable: classInfoResponse.isUpgradable,
			})
		);

		return mapped;
	}
}
