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
import { RoomCreateParams } from "@/types/room/Room";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRoomCreateState } from "@data-room";
import { RoomForm } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { ApiResponseError } from "@/store/types/commons";
import { notifyError } from "@data-app";

const { t } = useI18n();

const router = useRouter();
const { createRoom, roomData } = useRoomCreateState();

const pageTitle = computed(() =>
	buildPageTitle(`${t("pages.roomCreate.title")}`)
);
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
	try {
		const room = await createRoom(payload.room);

		router.push({ name: "room-details", params: { id: room.id } });
	} catch (error: unknown) {
		if (isInvalidRequestError(error)) {
			notifyError(t("components.roomForm.validation.generalSaveError"));
		} else {
			throw createApplicationError((error as ApiResponseError).code);
		}
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
