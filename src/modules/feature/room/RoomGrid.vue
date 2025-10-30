<template>
	<template v-if="isLoading">
		<VContainer class="loader">
			<VSkeletonLoader ref="skeleton-loader" type="date-picker-days" class="mt-6" />
		</VContainer>
	</template>
	<template v-else-if="isEmpty">
		<EmptyState :title="t('pages.rooms.emptyState')">
			<template #media>
				<RoomsEmptyStateSvg />
			</template>
		</EmptyState>
	</template>
	<template v-else>
		<v-row>
			<v-col v-for="(room, index) in rooms" :key="room.id" cols="6" md="4" lg="3">
				<RoomGridItem :room="room" class="px-5 mb-5" :data-testid="`room-tile-${index}`" />
			</v-col>
		</v-row>
	</template>
</template>

<script setup lang="ts">
import RoomGridItem from "./RoomGridItem.vue";
import { RoomItem } from "@/types/room/Room";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { useI18n } from "vue-i18n";

defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
	rooms: {
		type: Array<RoomItem>,
		required: true,
	},
});

const { t } = useI18n();
</script>
