<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 mb-4">{{ $t("pages.rooms.fab.title") }}</h1>
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

const onSave = async (roomParams: RoomCreateParams) => {
	const { id } = await createRoom(roomParams);
	router.push({ name: "room-details", params: { id } });
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};
</script>
<style scoped>
.text-h3 {
	size: 33px;
	line-height: 40px;
}
</style>
