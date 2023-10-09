import { ClassInfoResponseTypeEnum } from "../../serverApi/v3";

export type ClassInfo = {
	name: string;
	externalSourceName?: string;
	teachers: string[];
	type: ClassInfoResponseTypeEnum;
	id: string;
};
