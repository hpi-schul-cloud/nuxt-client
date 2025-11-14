<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 data-testid="page-title">
				{{ $t("pages.rooms.fab.title") }}
			</h1>
		</template>
		<RoomForm :room="roomData" @save="onSave" @cancel="onCancel" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ApiResponseError } from "@/store/types/commons";
import { RoomColor, RoomCreateParams } from "@/types/room/Room";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError } from "@data-app";
import { useRoomStore } from "@data-room";
import { RoomForm } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();

const router = useRouter();

const roomData = ref<RoomCreateParams>({
	name: "",
	color: RoomColor.BlueGrey,
	features: [],
});

const { createRoom } = useRoomStore();

const pageTitle = computed(() => buildPageTitle(`${t("pages.roomCreate.title")}`));
useTitle(pageTitle);

const breadcrumbs: Breadcrumb[] = [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: t("pages.rooms.fab.title"),
		disabled: true,
	},
];

const onSave = async (payload: { room: RoomCreateParams }) => {
	const { result: room, error } = await createRoom(payload.room);

	if (error && isInvalidRequestError(error)) {
		notifyError(t("components.roomForm.validation.generalSaveError"));
	} else if (room) {
		router.push({ name: "room-details", params: { id: room.data.id } });
	}
};

const isInvalidRequestError = (error: unknown): boolean => {
	const apiError = error as ApiResponseError;
	return apiError.code === 400;
};

const onCancel = () => {
	router.push({
		name: "rooms",
	});
};
</script>
