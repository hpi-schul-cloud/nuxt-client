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
import { RoomApiError, RoomCreateParams } from "@/types/room/Room";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRoomCreateState } from "@data-room";
import { RoomForm } from "@feature-room";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
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
	try {
		const room = await createRoom(roomParams);

		router.push({ name: "room-details", params: { id: room.id } });
	} catch (error) {
		if (error instanceof RoomApiError) {
			notifierModule.show({
				text: t("components.roomForm.validation.generalSaveError"),
				status: "error",
			});
		} else {
			throw createApplicationError(400);
		}
	}
};

const onCancel = () => {
	router.push({
		name: "rooms",
	});
};
</script>
