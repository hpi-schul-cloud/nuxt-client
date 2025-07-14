<template>
	<DefaultWireframe
		v-if="!isLoading && canEditRoom"
		max-width="short"
		:breadcrumbs="breadcrumbs"
	>
		<template #header>
			<h1 class="text-h3 mb-4" data-testid="page-title">
				{{ $t("pages.roomDetails.ariaLabels.menu.action.edit") }}
			</h1>
		</template>
		<div>
			<RoomForm :room="roomData" @save="onSave" @cancel="onCancel" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomColor, RoomUpdateParams } from "@/types/room/Room";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRoomAuthorization, useRoomDetailsStore } from "@data-room";
import { RoomForm } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ApiResponseError } from "@/store/types/commons";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { storeToRefs } from "pinia";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const roomDetailsStore = useRoomDetailsStore();
const { room, isLoading } = storeToRefs(roomDetailsStore);
const { fetchRoom, updateRoom } = roomDetailsStore;
const { canEditRoom } = useRoomAuthorization();

const roomData = ref<RoomUpdateParams>({
	name: room.value?.name ?? "",
	color: room.value?.color ?? RoomColor.BlueGrey,
	startDate: room.value?.startDate ?? undefined,
	endDate: room.value?.endDate ?? undefined,
});

const pageTitle = computed(() =>
	buildPageTitle(`${t("pages.roomEdit.title")}`)
);
useTitle(pageTitle);

onMounted(async () => {
	await fetchRoom(route.params.id as string);

	if (room.value) {
		roomData.value = {
			name: room.value.name,
			color: room.value.color,
			startDate: room.value.startDate,
			endDate: room.value.endDate,
		};
	}

	if (!canEditRoom.value) {
		router.replace({
			name: "room-details",
			params: { id: route.params.id as string },
		});
	}
});

const onSave = async (payload: { room: RoomUpdateParams }) => {
	try {
		await updateRoom(route.params.id as string, payload.room);

		router.push({
			name: "room-details",
			params: { id: route.params.id as string },
		});
	} catch (error: unknown) {
		if (isInvalidRequestError(error)) {
			notifierModule.show({
				text: t("components.roomForm.validation.generalSaveError"),
				status: "error",
			});
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
		name: "room-details",
		params: { id: route.params.id as string },
	});
};

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (roomData.value !== undefined) {
		return [
			{
				title: t("pages.rooms.title"),
				to: "/rooms",
			},
			{
				title: roomData.value.name,
				to: `/rooms/${route.params.id}`,
			},
			{
				title: t("pages.roomDetails.ariaLabels.menu.action.edit"),
				disabled: true,
			},
		];
	}

	return [];
});
</script>
