<template>
  <template v-if="isLoading">
    <div data-testid="loading" class="w-100 text-center">
      <VProgressCircular
        color="primary"
        indeterminate
        :size="51"
        class="my-10"
      />
    </div>
  </template>
  <template v-else>
    <RoomLockedPage v-if="isRoom && lockedRoomName" :title="lockedRoomName" />
    <RoomDetailsPage v-else-if="isRoom && room" :room="room" />
    <CourseRoomDetailsPage v-else />
  </template>
</template>

<script setup lang="ts">
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomDetailsPage, RoomLockedPage } from "@page-room";
import { storeToRefs } from "pinia";
import { computed, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const roomDetailsStore = useRoomDetailsStore();
const { isLoading, roomVariant, room, lockedRoomName } =
  storeToRefs(roomDetailsStore);

const { fetchRoomAndBoards, resetState } = roomDetailsStore;

watch(
  () => route.params.id,
  async () => {
    await fetchRoomAndBoards(route.params.id as string);
  },
  { immediate: true }
);

const isRoom = computed(() => roomVariant.value === RoomVariant.ROOM);

onUnmounted(() => {
  resetState();
});
</script>
