import { ContentItemTypeEnum } from "../enum/content-item-type.enum";

export type CopyParams = {
	id: string;
	type: ContentItemTypeEnum;
	courseId?: string;
};
