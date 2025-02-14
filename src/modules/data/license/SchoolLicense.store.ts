import {
	MediaSchoolLicenseListResponse,
	MediaSchoolLicenseResponse,
} from "@/serverApi/v3";
import { defineStore } from "pinia";
import { Ref, ref, ShallowRef, shallowRef } from "vue";
import { useSchoolLicenseApi } from "./schoolLicenseApi.composable";

export const useSchoolLicenseStore = defineStore("schoolLicenseStore", () => {
	const schoolLicenseApi = useSchoolLicenseApi();

	const mediaSchoolLicenses: ShallowRef<Set<string>> = shallowRef(new Set());

	const isLoading: Ref<boolean> = ref(false);

	const getLicenseIdentifier = (
		mediumId: string,
		mediaSourceId?: string
	): string => `${mediumId} ${mediaSourceId}`;

	const fetchMediaSchoolLicenses = async (): Promise<void> => {
		isLoading.value = true;

		const licenses: MediaSchoolLicenseListResponse =
			await schoolLicenseApi.getMediaSchoolLicensesForSchool();

		const licenseIdentifiers: string[] = licenses.data.map(
			(license: MediaSchoolLicenseResponse): string =>
				getLicenseIdentifier(license.mediumId, license.mediaSourceId)
		);

		mediaSchoolLicenses.value = new Set(licenseIdentifiers);

		isLoading.value = false;
	};

	const isLicensed = (mediumId: string, mediaSourceId?: string): boolean => {
		const hasLicense: boolean = mediaSchoolLicenses.value.has(
			getLicenseIdentifier(mediumId, mediaSourceId)
		);

		return hasLicense;
	};

	return {
		isLoading,
		mediaSchoolLicenses,
		getLicenseIdentifier,
		fetchMediaSchoolLicenses,
		isLicensed,
	};
});
