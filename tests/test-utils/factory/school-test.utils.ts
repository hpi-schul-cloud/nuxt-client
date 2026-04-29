import { mockedPiniaStoreTyping, mockSchool } from "@@/tests/test-utils";
import { SchoolResponse, SchoolSystemResponse } from "@api-server";
import { useSchoolStore } from "@data-app";
import { DeepPartial } from "fishery";
import { Pinia } from "pinia";

export const createTestSchoolStore = (
	{
		schoolDetails,
		schoolSystems,
		pinia,
	}: {
		schoolDetails?: DeepPartial<SchoolResponse>;
		schoolSystems?: DeepPartial<SchoolSystemResponse[]>;
		pinia?: Pinia;
	} = { schoolDetails: mockSchool }
) => {
	const store = useSchoolStore(pinia);

	store.$patch({ schoolDetails, schoolSystems });

	const schoolStore = mockedPiniaStoreTyping(useSchoolStore);

	return { schoolDetails, schoolStore };
};
