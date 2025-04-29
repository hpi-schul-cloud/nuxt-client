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
} from "./types";

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
		const api = RoomInvitationLinkApiFactory(undefined, "/v3", $axios);

		const getRoomId = () => {
			if (!roomId.value) {
				throw new Error("RoomDetailStore is not initialized");
			}
			return roomId.value;
		};

		const initStore = async () => {
			if (roomId.value === undefined) {
				setTimeout(() => initStore(), 100);
			} else {
				await fetchLinks();
			}
		};

		const fetchLinks = async () => {
			try {
				isLoading.value = true;

				const response =
					await roomApi.roomControllerGetInvitationLinks(getRoomId());
				roomInvitationLinks.value = response.data.roomInvitationLinks;

				isLoading.value = false;
			} catch {
				showFailure(t("pages.rooms.members.error.load"));
				isLoading.value = false;
			}
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
			} catch {
				showFailure(t("pages.rooms.members.error.create"));
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
				showFailure(t("pages.rooms.members.error.update"));
			}
		};

		const deleteLink = async (linkId: string) => {
			try {
				await api.roomInvitationLinkControllerDeleteLink(linkId);

				roomInvitationLinks.value = roomInvitationLinks.value.filter(
					(link) => link.id !== linkId
				);
			} catch {
				showFailure(t("pages.rooms.members.error.delete"));
			}
		};

		const useLink = async (linkId: string) => {
			try {
				const response = await api.roomInvitationLinkControllerUseLink(linkId);
				return response.data;
			} catch {
				showFailure(t("pages.rooms.members.error.use"));
			}
		};

		const resetStore = () => {
			isLoading.value = false;
			roomInvitationLinks.value = [];
		};

		return {
			initStore,
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
