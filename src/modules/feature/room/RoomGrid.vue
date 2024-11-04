<template>
	<template v-if="isLoading">
		<VContainer class="loader">
			<VSkeletonLoader
				ref="skeleton-loader"
				type="date-picker-days"
				class="mt-6"
			/>
		</VContainer>
	</template>
	<template v-else-if="isEmpty">
		<VCustomEmptyState
			ref="rooms-empty-state"
			image="rooms-empty-state"
			:title="t('pages.rooms.emptyState')"
			class="mt-16"
		/>
	</template>
	<template v-else>
		<v-row>
			<v-col
				v-for="(room, index) in rooms"
				:key="room.id"
				cols="6"
				md="4"
				lg="3"
			>
				<RoomTile
					:room="room"
					class="px-5 mb-5"
					:draggable="draggable"
					:data-testid="`room-tile-${index}`"
				/>
			</v-col>
		</v-row>
	</template>
</template>

<script setup lang="ts">
import { useRoomsState } from "@data-room";
import { onMounted } from "vue";
import RoomTile from "./RoomTile.vue";
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { rooms, isLoading, isEmpty, fetchRooms } = useRoomsState();

defineProps({
	draggable: {
		type: Boolean,
		default: false,
	},
});

onMounted(() => {
	fetchRooms();
});
</script>
