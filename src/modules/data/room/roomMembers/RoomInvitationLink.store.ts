import {
	CreateRoomInvitationLinkDto,
	InvitationStep,
	RoomInvitationLink,
	UpdateRoomInvitationLinkDto,
	UseLinkResult,
} from "./types";
import { printFromStringUtcToFullDate } from "@/plugins/datetime";
import { RoomApiFactory, RoomInvitationLinkApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { notifyError } from "@data-app";
import { useRoomDetailsStore } from "@data-room";
import { isAxiosError } from "axios";
import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useRoomInvitationLinkStore = defineStore("roomInvitationLinkStore", () => {
	const { t } = useI18n();

	const { room } = storeToRefs(useRoomDetailsStore());

	const roomInvitationLinks: Ref<RoomInvitationLink[]> = ref([]);
	const isLoading = ref<boolean>(false);
	const isInvitationDialogOpen = ref(false);
	const invitationStep = ref<InvitationStep>(InvitationStep.PREPARE);
	const sharedUrl = ref<string>("");
	const selectedIds = ref<string[]>([]);
	const editedLink = ref<RoomInvitationLink | null>(null);
	const DEFAULT_EXPIRED_DATE = ref<string>("2900-01-01T00:00:00.000Z");
	const BASE_SHARED_URL = `${window.location.origin}/rooms/invitation-link/`;

	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const api = RoomInvitationLinkApiFactory(undefined, "/v3", $axios);

	const fetchLinks = async () => {
		const isRoomDetailsStoreLoaded = room.value !== undefined;
		if (isRoomDetailsStoreLoaded) {
			await fetchLinksInternal(room.value!.id);
		} else {
			setTimeout(() => fetchLinks(), 100);
		}
	};

	const checkDefaultExpiredDate = (link: RoomInvitationLink) => ({
		...link,
		activeUntil: link.activeUntil === DEFAULT_EXPIRED_DATE.value ? undefined : link.activeUntil,
	});

	const fetchLinksInternal = async (roomId: string) => {
		try {
			isLoading.value = true;
			const response = await roomApi.roomControllerGetInvitationLinks(roomId);
			roomInvitationLinks.value = response.data.roomInvitationLinks.map((link) => checkDefaultExpiredDate(link));
		} catch {
			notifyError(t("pages.rooms.invitationlinks.error.load"));
		} finally {
			isLoading.value = false;
		}
	};

	const getRoomId = () => {
		if (!room.value) {
			throw new Error("RoomDetailStore is not initialized");
		}
		return room.value.id;
	};

	const createLink = async (link: CreateRoomInvitationLinkDto) => {
		try {
			const response = (
				await api.roomInvitationLinkControllerCreateRoomInvitationLink({
					...link,
					roomId: getRoomId(),
				})
			).data;

			roomInvitationLinks.value.push(checkDefaultExpiredDate(response));
			sharedUrl.value = BASE_SHARED_URL + response.id;
			invitationStep.value = InvitationStep.SHARE;
		} catch {
			notifyError(t("pages.rooms.invitationlinks.error.create"));
			isInvitationDialogOpen.value = false;
		}
	};

	const updateLink = async (link: UpdateRoomInvitationLinkDto) => {
		try {
			const response = (
				await api.roomInvitationLinkControllerUpdateLink(link.id, {
					...link,
				})
			).data;

			const existingLinkIndex = roomInvitationLinks.value.findIndex((l) => l.id === link.id);
			if (existingLinkIndex !== -1) {
				roomInvitationLinks.value[existingLinkIndex] = checkDefaultExpiredDate(response);
			}

			sharedUrl.value = BASE_SHARED_URL + response.id;
			invitationStep.value = InvitationStep.SHARE;
		} catch {
			notifyError(t("pages.rooms.invitationlinks.error.update"));
			isInvitationDialogOpen.value = false;
		} finally {
			isLoading.value = false;
			editedLink.value = null;
		}
	};

	const deleteLinks = async (linkIds: string | string[]) => {
		try {
			if (typeof linkIds === "string") {
				linkIds = [linkIds];
			}
			await api.roomInvitationLinkControllerDeleteLinks(linkIds);

			roomInvitationLinks.value = roomInvitationLinks.value.filter((link) => !linkIds.includes(link.id));
			selectedIds.value = [];
		} catch {
			notifyError(t("pages.rooms.invitationlinks.error.delete"));
		}
	};

	const useLink = async (linkId: string): Promise<UseLinkResult> => {
		const result: UseLinkResult = {
			roomId: "",
			validationMessage: "",
			schoolName: "",
		};
		try {
			const response = await api.roomInvitationLinkControllerUseLink(linkId);
			result.roomId = response.data.id;
		} catch (error) {
			if (isAxiosError(error)) {
				const details = error?.response?.data.details;
				const { validationMessage, schoolName } = details;
				result.validationMessage = validationMessage;
				result.schoolName = schoolName;
			}
		}
		return result;
	};

	const resetStore = () => {
		isLoading.value = false;
		roomInvitationLinks.value = [];
	};

	const commonTranslationsMap = {
		YES: t("pages.rooms.members.tables.common.yes"),
		NO: t("pages.rooms.members.tables.common.no"),
		EXPIRED: t("pages.rooms.members.tables.common.expired"),
		ACTIVE: t("pages.rooms.members.tables.common.active"),
	};

	const invitationTableData = computed(() =>
		roomInvitationLinks.value.map((link) => ({
			id: link.id,
			title: link.title,
			isUsableByStudents: link.isUsableByStudents ? commonTranslationsMap.YES : commonTranslationsMap.NO,
			...(link.isUsableByExternalPersons !== undefined && {
				isUsableByExternalPersons: link.isUsableByExternalPersons
					? commonTranslationsMap.YES
					: commonTranslationsMap.NO,
			}),
			activeUntil: link.activeUntil ? printFromStringUtcToFullDate(link.activeUntil) : commonTranslationsMap.NO,
			isExpired: isExpired(link.activeUntil!),
			status: isExpired(link.activeUntil!) ? commonTranslationsMap.EXPIRED : commonTranslationsMap.ACTIVE,
			restrictedToCreatorSchool: link.restrictedToCreatorSchool ? commonTranslationsMap.YES : commonTranslationsMap.NO,
			requiresConfirmation: link.requiresConfirmation ? commonTranslationsMap.YES : commonTranslationsMap.NO,
		}))
	);

	const isExpired = (linkExpireDate: string) => new Date(linkExpireDate) < new Date();

	return {
		resetStore,
		fetchLinks,
		createLink,
		updateLink,
		deleteLinks,
		useLink,
		editedLink,
		invitationStep,
		isInvitationDialogOpen,
		isLoading,
		invitationTableData,
		roomInvitationLinks,
		selectedIds,
		sharedUrl,
		DEFAULT_EXPIRED_DATE,
	};
});
