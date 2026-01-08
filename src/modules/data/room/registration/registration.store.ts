import { useRoomDetailsStore } from "../RoomDetails.store";
import { useI18nGlobal } from "@/plugins/i18n";
import {
	LanguageType,
	RegistrationApiFactory,
	RegistrationItemResponse,
	RegistrationListResponse,
} from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { notifyError, notifyInfo, notifySuccess } from "@data-app";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

export type RegistrationList = RegistrationListResponse["data"];
export type Registration = RegistrationItemResponse;

export const useRegistrationStore = defineStore("registration", () => {
	const { t } = useI18nGlobal();

	const { room } = storeToRefs(useRoomDetailsStore());
	const roomId = computed(() => room.value?.id);

	const registrationApi = RegistrationApiFactory(undefined, "/v3", $axios);

	const registrations = ref<RegistrationList>([]);
	const registrationSecret = ref<string>("");
	const userData = ref<{
		firstName: string;
		lastName: string;
		email: string;
	} | null>(null);
	const hasApiErrorOccurred = ref<boolean>(false);

	const isLoading = ref<boolean>(false);
	const selectedIds = ref<string[]>([]);

	const fetchRegistrationsForCurrentRoom = async () => {
		if (!roomId.value) return;

		isLoading.value = true;
		try {
			const { data } = await registrationApi.registrationControllerFindByRoom(roomId.value);

			registrations.value = data.data ?? [];
		} catch {
			notifyError(t("pages.registrationExternalMembers.error.failedFetchRegistrations"), false);
		} finally {
			isLoading.value = false;
		}
	};

	const fetchUserData = async () => {
		isLoading.value = true;
		try {
			const { firstName, lastName, email } = (
				await registrationApi.registrationControllerGetBySecret(registrationSecret.value)
			).data;

			userData.value = { firstName, lastName, email };
		} catch (error: unknown) {
			const { code } = mapAxiosErrorToResponseError(error);
			hasApiErrorOccurred.value = true;
			if (code === HttpStatusCode.NotFound) {
				notifyError(t("pages.registrationExternalMembers.error.failedFetchUserData.404"), false);
				return;
			}
			notifyError(t("pages.registrationExternalMembers.error.failedFetchUserData"), false);
		} finally {
			isLoading.value = false;
		}
	};

	const getRegistrationById = (registrationId: string) =>
		registrations.value.find((registration) => registration.id === registrationId);

	const getEmailOfRegistration = (registrationId = "") => {
		const registration = getRegistrationById(registrationId);
		if (!registration) {
			return "";
		}
		return registration.email;
	};

	const completeRegistration = async (language: LanguageType, password: string): Promise<boolean> => {
		isLoading.value = true;
		try {
			await registrationApi.registrationControllerCompleteRegistration(registrationSecret.value, {
				language,
				password,
			});
			return true;
		} catch {
			notifyError(t("pages.registrationExternalMembers.error.failedCompleteRegistration"), false);
			return false;
		} finally {
			isLoading.value = false;
		}
	};

	const removeInvitations = async (invitationIds: string[]): Promise<void> => {
		try {
			if (!roomId.value) return;

			await registrationApi.registrationControllerCancelRegistrations(roomId.value, { registrationIds: invitationIds });
			await fetchRegistrationsForCurrentRoom();
			selectedIds.value = [];
			if (invitationIds.length > 1) {
				notifySuccess(t("pages.rooms.members.registrations.remove.success.multiple"));
			} else {
				notifySuccess(t("pages.rooms.members.registrations.remove.success.single"));
			}
		} catch {
			notifyError(t("pages.registrationExternalMembers.error.failedRemoveInvitations"), false);
		}
	};

	const resendInvitations = async (invitationIds: string[]): Promise<void> => {
		try {
			if (!roomId.value) return;

			const resentInvitations = await registrationApi.registrationControllerResendRegistrationMails(roomId.value, {
				registrationIds: invitationIds,
			});
			const resentIds = resentInvitations.data.data.map((invitation) => invitation.id);
			if (resentIds.length === 0) {
				notifyInfo(t("pages.registrationExternalMembers.info.invitationRecentlySent"), false);
				return;
			}
			await fetchRegistrationsForCurrentRoom();
			selectedIds.value = [];
			if (resentIds.length > 1) {
				notifySuccess(t("pages.rooms.members.registrations.resend.success.multiple"));
			} else {
				notifySuccess(t("pages.rooms.members.registrations.resend.success.single"));
			}
		} catch {
			notifyError(t("pages.registrationExternalMembers.error.failedResendInvitations"), false);
		}
	};

	const resetStore = () => {
		isLoading.value = false;
		registrationSecret.value = "";
		userData.value = null;
		registrations.value = [];
		selectedIds.value = [];
	};

	return {
		hasApiErrorOccurred,
		isLoading,
		registrationSecret,
		userData,
		registrations,
		selectedIds,
		resetStore,
		fetchRegistrationsForCurrentRoom,
		fetchUserData,
		completeRegistration,
		removeInvitations,
		resendInvitations,
		getRegistrationById,
		getEmailOfRegistration,
	};
});
