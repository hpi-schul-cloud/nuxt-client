import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { SchoolResponse } from "@api-server";
import { useSchoolStore } from "@data-app";
import { DeepPartial } from "fishery";
import { Pinia } from "pinia";

export const createTestSchoolStore = ({
	schoolDetails,
	pinia,
}: {
	schoolDetails?: DeepPartial<SchoolResponse>;
	pinia?: Pinia;
} = {}) => {
	const store = useSchoolStore(pinia);

	store.$patch({ schoolDetails });

	const schoolStore = mockedPiniaStoreTyping(useSchoolStore);

	return { schoolDetails, schoolStore };
};
