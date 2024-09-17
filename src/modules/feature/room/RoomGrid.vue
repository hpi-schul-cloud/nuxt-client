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
		<div class="room-tile-grid">
			<RoomTile
				v-for="room in rooms"
				:key="room.id"
				:room="room"
				class="room-tile"
			/>
		</div>
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

onMounted(() => {
	fetchRooms();
});
</script>

<style lang="scss">
@import "@/styles/settings.scss";

.room-tile-grid {
	margin-left: -20px;
	margin-right: -20px;

	@media #{map-get($display-breakpoints, "sm-and-up")} {
		display: flex;
		flex-wrap: wrap;
	}
}

.room-tile {
	padding-left: 20px;
	padding-right: 20px;

	margin-bottom: 20px;

	@media #{map-get($display-breakpoints, "sm-and-up")} {
		flex: 0 0 50%;
	}
	@media #{map-get($display-breakpoints, "md-and-up")} {
		flex: 0 0 33.3333%;
	}
	@media #{map-get($display-breakpoints, "lg-and-up")} {
		flex: 0 0 25%;
	}
}
</style>
