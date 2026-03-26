import { ConsentVersion, CreateConsentVersionPayload } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { notifySuccess } from "@data-app";
import { readonly, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useSchoolTermsOfUse = () => {
	const { t } = useI18n();
	const { execute, status } = useSafeAxiosTask();
	const termsOfUse = ref<ConsentVersion | null>(null);

	const fetchTermsOfUse = async (schoolId: string) => {
		const params = {
			schoolId,
			consentTypes: ["termsOfUse"],
			consentDataId: { $exists: true },
			$populate: "consentData",
			$limit: 1,
			$sort: {
				publishedAt: -1,
			},
		};
		const { result } = await execute(() => $axios.get("/v1/consentVersions", { params }));
		termsOfUse.value = result?.data?.data?.[0] ?? null;
	};

	const createTermsOfUse = async (payload: CreateConsentVersionPayload) => {
		const { result, error } = await execute(() => $axios.post("/v1/consentVersions", payload));

		if (error) return;

		if (termsOfUse.value) {
			try {
				await $axios.delete(`/v1/consentVersions/${termsOfUse.value._id}`);
			} catch {
				// ignore error if deletion of old terms of use fails, as it should not block the creation of the new
				// if this fails we will end up with stale terms of use in the database which was the case before as well and should be handled by the backend
			}
		}

		if (result) {
			const { consentDataId, ...responseData } = result.data;
			termsOfUse.value = {
				...responseData,
				consentData: {
					_id: consentDataId,
					schoolId: payload.schoolId,
					createdAt: responseData.createdAt,
					updatedAt: responseData.updatedAt,
					filetype: "pdf",
					filename: "Terms of Use",
					data: payload.consentData,
				},
			};
			notifySuccess(t("pages.administration.school.index.termsOfUse.success"));
		}
	};

	const deleteTermsOfUse = async () => {
		if (!termsOfUse.value) return;

		const { error } = await execute(() => $axios.delete(`/v1/consentVersions/${termsOfUse.value?._id}`));
		if (!error) {
			termsOfUse.value = null;
			notifySuccess(t("pages.administration.school.index.termsOfUse.delete.success"));
		}
	};

	return {
		termsOfUse: readonly(termsOfUse),
		status: status,
		fetchTermsOfUse,
		createTermsOfUse,
		deleteTermsOfUse,
	};
};
