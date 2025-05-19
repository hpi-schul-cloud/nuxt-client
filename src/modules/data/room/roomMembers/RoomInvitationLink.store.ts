import { RoomApiFactory, RoomInvitationLinkApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useRoomDetailsStore } from "@data-room";
import { useBoardNotifier } from "@util-board";
import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	CreateRoomInvitationLinkDto,
	RoomInvitationLink,
	UpdateRoomInvitationLinkDto,
	UseLinkResult,
	InvitationStep,
} from "./types";
import { isAxiosError } from "axios";
import { printFromStringUtcToFullDate } from "@/plugins/datetime";

export const useRoomInvitationLinkStore = defineStore(
	"roomInvitationLinkStore",
	() => {
		const { t } = useI18n();
		const { showFailure } = useBoardNotifier();

		const { room } = storeToRefs(useRoomDetailsStore());

		const roomInvitationLinks: Ref<RoomInvitationLink[]> = ref([]);
		const isLoading = ref<boolean>(false);
		const isInvitationDialogOpen = ref(false);
		const invitationStep = ref<InvitationStep>(InvitationStep.PREPARE);
		const sharedUrl = ref<string>();
		const selectedIds = ref<string[]>([]);
		const editedLink = ref<RoomInvitationLink | null>(null);

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

		const fetchLinksInternal = async (roomId: string) => {
			try {
				isLoading.value = true;
				const response = await roomApi.roomControllerGetInvitationLinks(roomId);
				roomInvitationLinks.value = response.data.roomInvitationLinks;
			} catch {
				showFailure(t("pages.rooms.invitationlinks.error.load"));
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

				roomInvitationLinks.value.push(response);
				sharedUrl.value = `${window.location.origin}/rooms/invitation-link/${response.id}`;
				invitationStep.value = InvitationStep.SHARE;
			} catch {
				showFailure(t("pages.rooms.invitationlinks.error.create"));
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

				roomInvitationLinks.value = roomInvitationLinks.value.map((l) =>
					l.id === link.id ? response : l
				);

				sharedUrl.value = `${window.location.origin}/rooms/invitation-link/${response.id}`;
				invitationStep.value = InvitationStep.SHARE;
			} catch {
				showFailure(t("pages.rooms.invitationlinks.error.update"));
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

				roomInvitationLinks.value = roomInvitationLinks.value.filter(
					(link) => !linkIds.includes(link.id)
				);
				selectedIds.value = [];
			} catch {
				showFailure(t("pages.rooms.invitationlinks.error.delete"));
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

		const invitationTableData = computed(() => {
			return roomInvitationLinks.value.map((link) => ({
				id: link.id,
				title: link.title,
				isValidForStudents: link.isOnlyForTeachers
					? commonTranslationsMap.NO
					: commonTranslationsMap.YES,
				activeUntil: printFromStringUtcToFullDate(link.activeUntil!),
				isExpired: isExpired(link.activeUntil!),
				status: isExpired(link.activeUntil!)
					? commonTranslationsMap.EXPIRED
					: commonTranslationsMap.ACTIVE,

				restrictedToCreatorSchool: link.restrictedToCreatorSchool
					? commonTranslationsMap.YES
					: commonTranslationsMap.NO,
				requiresConfirmation: link.requiresConfirmation
					? commonTranslationsMap.YES
					: commonTranslationsMap.NO,
			}));
		});

		const isExpired = (linkExpireDate: string) => {
			return new Date(linkExpireDate) < new Date();
		};

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
		};
	}
);
