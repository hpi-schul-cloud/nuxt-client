import {
	CreateRoomInvitationLinkBodyParams,
	RoomApiFactory,
	RoomInvitationLinksApiFactory,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useRoomDetailsStore } from "@data-room";
import { useBoardNotifier } from "@util-board";
import { defineStore, storeToRefs } from "pinia";
import { computed, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RoomInvitationLink } from "./types";

export const useRoomInvitationLinkStore = defineStore(
	"roomInvitationLinkStore",
	() => {
		const { t } = useI18n();
		const { showFailure } = useBoardNotifier();

		const { room } = storeToRefs(useRoomDetailsStore());
		const roomId = computed(() => room.value?.id);

		const roomInvitationLinks: Ref<RoomInvitationLink[]> = ref([]);
		const isLoading = ref<boolean>(false);

		const roomApi = RoomApiFactory(undefined, "/v3", $axios);
		const api = RoomInvitationLinksApiFactory(undefined, "/v3", $axios);

		const getRoomId = () => {
			if (!roomId.value) {
				throw new Error("RoomDetailStore is not initialized");
			}
			return roomId.value;
		};

		const fetchLinks = async () => {
			try {
				isLoading.value = true;
				const response = (
					await roomApi.roomControllerGetInvitationLinks(getRoomId())
				).data;

				roomInvitationLinks.value = response.roomInvitationLinks;

				isLoading.value = false;
			} catch {
				showFailure(t("pages.rooms.members.error.load")); // TODO: fix language key
				isLoading.value = false;
			}
		};

		const createLink = async (
			link: Omit<CreateRoomInvitationLinkBodyParams, "roomId">
		) => {
			try {
				const response = (
					await api.roomInvitationLinkControllerCreateRoomInvitationLink({
						...link,
						roomId: getRoomId(),
					})
				).data;

				roomInvitationLinks.value.push(response);
			} catch {
				showFailure(t("pages.rooms.members.error.create")); // TODO: fix language key
			}
		};

		const updateLink = async (
			linkId: string,
			link: Omit<CreateRoomInvitationLinkBodyParams, "roomId">
		) => {
			try {
				const response = (
					await api.roomInvitationLinkControllerUpdateLink(linkId, {
						...link,
					})
				).data;

				roomInvitationLinks.value = roomInvitationLinks.value.map((l) =>
					l.id === linkId ? response : l
				);
			} catch {
				showFailure(t("pages.rooms.members.error.update")); // TODO: fix language key
			}
		};

		const deleteLink = async (linkId: string) => {
			try {
				await api.roomInvitationLinkControllerDeleteLink(linkId);

				roomInvitationLinks.value = roomInvitationLinks.value.filter(
					(link) => link.id !== linkId
				);
			} catch {
				showFailure(t("pages.rooms.members.error.delete")); // TODO: fix language key
			}
		};

		const useLink = async (linkId: string) => {
			try {
				const response = await api.roomInvitationLinkControllerUseLink(linkId);
				return response.data;
			} catch {
				showFailure(t("pages.rooms.members.error.use")); // TODO: fix language key
			}
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
			deleteLink,
			useLink,
			roomInvitationLinks,
			isLoading,
		};
	}
);
