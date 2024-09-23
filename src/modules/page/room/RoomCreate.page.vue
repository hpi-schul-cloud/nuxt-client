<template>
	<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">{{ $t("pages.rooms.fab.title") }}</h1>
		</template>
		<RoomForm
			:room="roomData"
			@update:color="onUpdateColor($event)"
			@update:name="onUpdateName($event)"
			@update:startDate="onUpdateStartDate($event)"
			@update:endDate="onUpdateEndDate($event)"
		/>
		<div class="d-flex">
			<VSpacer />
			<VBtn variant="text" class="mr-4" @click="onCancel">
				{{ $t("common.actions.cancel") }}
			</VBtn>
			<VBtn variant="flat" color="primary" @click="onSave">
				{{ $t("common.actions.save") }}
			</VBtn>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomColor } from "@/serverApi/v3";
import { RoomForm } from "@feature-room";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();

const router = useRouter();

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

const roomData = ref({
	id: "",
	name: "",
	color: RoomColor.BlueGrey,
	startDate: "",
	endDate: "",
});

const onSave = () => {
	// await roomApi.roomControllerPostRoom(roomData.value);
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};

const onUpdateColor = (color: RoomColor) => {
	roomData.value.color = color;
};

const onUpdateName = (name: string) => {
	roomData.value.name = name;
};

const onUpdateStartDate = (startDate: string) => {
	roomData.value.startDate = startDate;
};

const onUpdateEndDate = (endDate: string) => {
	roomData.value.endDate = endDate;
};
</script>
