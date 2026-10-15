import { notifyError, notifySuccess } from "./notification-store";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

export type FormerMembershipType = "course" | "room";

export interface FormerMembershipItem {
	type: FormerMembershipType;
	refId: string;
	name: string;
	schoolId: string;
	schoolName?: string;
}

export interface TransferFormerMembershipResponse {
	success: boolean;
	type: FormerMembershipType;
	refId: string;
	newRefId?: string;
	error?: string;
}

export interface TransferAllFormerMembershipsResponse {
	total: number;
	transferred: number;
	failed: number;
	results: TransferFormerMembershipResponse[];
}

export const useFormerMembershipStore = defineStore("formerMembershipStore", () => {
	const { t } = useI18nGlobal();
	const items = ref<FormerMembershipItem[]>([]);
	const isDismissed = ref(false);
	const transferringIds = ref<Set<string>>(new Set());

	const { execute: executeFetch, isRunning: isLoading } = useSafeAxiosTask();
	const { execute: executeAction, isRunning: isProcessing } = useSafeAxiosTask();

	const hasFormerMemberships = computed(() => items.value.length > 0);
	const courseCount = computed(() => items.value.filter((i) => i.type === "course").length);
	const roomCount = computed(() => items.value.filter((i) => i.type === "room").length);

	const fetchFormerMemberships = async () => {
		const { result } = await executeFetch(
			() => $axios.get<FormerMembershipItem[]>("/v3/users/me/former-memberships"),
			t("formerMemberships.notifications.fetchError")
		);
		if (result?.data) {
			items.value = result.data;
		}
		return result?.data ?? [];
	};

	const transferMembership = async (type: FormerMembershipType, refId: string, name: string) => {
		transferringIds.value.add(refId);
		try {
			const { result, error } = await executeAction(
				() =>
					$axios.post<TransferFormerMembershipResponse>(`/v3/users/me/former-memberships/${type}/${refId}/transfer`),
				t("formerMemberships.notifications.transferError", { name })
			);
			if (result?.data?.success) {
				items.value = items.value.filter((item) => !(item.type === type && item.refId === refId));
				notifySuccess(t("formerMemberships.notifications.transferSuccess", { name }));
				return true;
			} else if (error) {
				return false;
			}
			return false;
		} finally {
			transferringIds.value.delete(refId);
		}
	};

	const transferAllMemberships = async () => {
		const { result } = await executeAction(
			() => $axios.post<TransferAllFormerMembershipsResponse>("/v3/users/me/former-memberships/transfer-all"),
			t("formerMemberships.notifications.transferAllError")
		);
		if (result?.data) {
			const res = result.data;
			const successfulIds = new Set(res.results.filter((r) => r.success).map((r) => `${r.type}-${r.refId}`));
			items.value = items.value.filter((item) => !successfulIds.has(`${item.type}-${item.refId}`));
			if (res.transferred > 0) {
				notifySuccess(t("formerMemberships.notifications.transferAllSuccess"));
			}
			if (res.failed > 0) {
				notifyError(t("formerMemberships.notifications.transferAllPartialError", { count: res.failed }));
			}
			return res;
		}
		return undefined;
	};

	const discardMembership = async (type: FormerMembershipType, refId: string, name: string) => {
		transferringIds.value.add(refId);
		try {
			const { success } = await executeAction(
				() => $axios.delete(`/v3/users/me/former-memberships/${type}/${refId}`),
				t("formerMemberships.notifications.discardError", { name })
			);
			if (success) {
				items.value = items.value.filter((item) => !(item.type === type && item.refId === refId));
				notifySuccess(t("formerMemberships.notifications.discardSuccess", { name }));
				return true;
			}
			return false;
		} finally {
			transferringIds.value.delete(refId);
		}
	};

	const dismissBanner = () => {
		isDismissed.value = true;
	};

	return {
		items,
		isLoading,
		isProcessing,
		isDismissed,
		transferringIds,
		hasFormerMemberships,
		courseCount,
		roomCount,
		fetchFormerMemberships,
		transferMembership,
		transferAllMemberships,
		discardMembership,
		dismissBanner,
	};
});

export const useFormerMembershipStoreRefs = () => storeToRefs(useFormerMembershipStore());
