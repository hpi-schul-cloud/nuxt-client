import { RoomApiFactory, RoomInvitationLinkApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useRoomDetailsStore } from "@data-room";
import { useBoardNotifier } from "@util-board";
import { defineStore, storeToRefs } from "pinia";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	CreateRoomInvitationLinkDto,
	RoomInvitationLink,
	UpdateRoomInvitationLinkDto,
	UseLinkResult,
} from "./types";
import { isAxiosError } from "axios";

export const useRoomInvitationLinkStore = defineStore(
	"roomInvitationLinkStore",
	() => {
		const { t } = useI18n();
		const { showFailure } = useBoardNotifier();

		const { room } = storeToRefs(useRoomDetailsStore());

		const roomInvitationLinks: Ref<RoomInvitationLink[]> = ref([]);
		const isLoading = ref<boolean>(false);

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

				return response.id;
			} catch {
				showFailure(t("pages.rooms.invitationlinks.error.create"));
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
			} catch {
				showFailure(t("pages.rooms.invitationlinks.error.update"));
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

		return {
			resetStore,
			fetchLinks,
			createLink,
			updateLink,
			deleteLinks,
			useLink,
			roomInvitationLinks,
			isLoading,
		};
	}
);
