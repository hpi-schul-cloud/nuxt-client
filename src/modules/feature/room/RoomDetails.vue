<template>
	<template v-if="room">
		<DefaultWireframe max-width="short" :breadcrumbs="breadcrumbs">
			<template #header>
				<h1 class="text-h3 py-2 mb-4">{{ room.title }}</h1>
			</template>
			<div>[TODO - RoomDetails content]</div>
		</DefaultWireframe>
	</template>
</template>

<script setup lang="ts">
import { Room } from "@/types/room/Room";
import { computed, ComputedRef, PropType } from "vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	room: { type: Object as PropType<Room | undefined> },
});

const room = computed(() => props.room);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (room.value != null) {
		return [
			{
				title: t("pages.rooms.active.title"),
				to: "/rooms",
			},
			{
				title: room.value.title,
				disabled: true,
			},
		];
	}
	return [];
});
</script>
