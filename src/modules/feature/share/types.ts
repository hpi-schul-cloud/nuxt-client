import { BoardExternalReferenceType, ShareTokenBodyParamsParentType } from "@api-server";

export type ShareParams = {
	id: string;
	type: ShareTokenBodyParamsParentType;
	destinationType?: BoardExternalReferenceType;
};

export type ShareOptions = {
	isSchoolInternal: boolean;
	hasExpiryDate: boolean;
};
