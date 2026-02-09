import { notifySuccess } from "../application/notification-store";
import { ConsentVersion, CreateConsentVersionPayload } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { readonly, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useSchoolPrivacyPolicy = () => {
	const { t } = useI18n();
	const { execute, status } = useSafeAxiosTask();
	const privacyPolicy = ref<ConsentVersion | null>(null);

	const fetchPrivacyPolicy = async (schoolId: string) => {
		const params = {
			schoolId,
			consentTypes: ["privacy"],
			consentDataId: { $exists: true },
			$populate: "consentData",
			$limit: 1,
			$sort: { publishedAt: -1 },
		};

		const { result } = await execute(() => $axios.get("/v1/consentVersions", { params }));
		privacyPolicy.value = result?.data?.data?.[0] ?? null;
	};

	const createPrivacyPolicy = async (payload: CreateConsentVersionPayload) => {
		const { result, error } = await execute(() => $axios.post("/v1/consentVersions", payload));

		if (error) return;

		if (privacyPolicy.value) {
			try {
				await $axios.delete(`/v1/consentVersions/${privacyPolicy.value._id}`);
			} catch {
				// ignore error if deletion of old privacy policy fails, as it should not block the creation of the new
				// if this fails we will end up with stale privacy policies in the database which was the case before as well and should be handled by the backend
			}
		}

		if (result) {
			privacyPolicy.value = {
				...result.data,
				consentData: { data: payload.consentData },
			};
			notifySuccess(t("pages.administration.school.index.schoolPolicy.success"));
		}
	};

	const deletePrivacyPolicy = async () => {
		if (!privacyPolicy.value) return;

		const { error } = await execute(() => $axios.delete(`/v1/consentVersions/${privacyPolicy.value?._id}`));
		if (!error) {
			privacyPolicy.value = null;
			notifySuccess(t("pages.administration.school.index.schoolPolicy.delete.success"));
		}
	};

	return {
		privacyPolicy: readonly(privacyPolicy),
		status,
		fetchPrivacyPolicy,
		createPrivacyPolicy,
		deletePrivacyPolicy,
	};
};
