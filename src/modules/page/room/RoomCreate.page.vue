<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">{{ $t("pages.rooms.fab.title") }}</h1>
		</template>
		<RoomForm :room="roomData" @save="onSave" @cancel="onCancel" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomForm } from "@feature-room";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { RoomCreateParams } from "@/types/room/Room";
import { useRoomCreateState } from "@data-room";

const { t } = useI18n();

const router = useRouter();
const { createRoom, roomData } = useRoomCreateState();

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

const onSave = async (roomParams: RoomCreateParams) => {
	const { id } = await createRoom(roomParams);
	router.push({ name: "room-details", params: { id } });
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};
</script>
