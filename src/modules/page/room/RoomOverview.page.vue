<template>
	<DefaultWireframe max-width="short">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Rooms [TODO translation]</h1>
		</template>
		<template v-if="isLoading">
			<VContainer class="loader">
				<p>Loading content - TODO component</p>
			</VContainer>
		</template>
		<template v-else-if="isEmptyState">
			<p>Empty state [TODO component]</p>
		</template>
		<template v-else>
			<p>Content [TODO component]</p>
			<ul>
				<li v-for="room in roomList" :key="room.id">
					{{ room.title }}
				</li>
			</ul>
		</template>
	</DefaultWireframe>
</template>
<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useRoomListStore } from "@data-room";
import { computed, onMounted } from "vue";

const { roomList, isLoading, fetchRoomList } = useRoomListStore();

const isEmptyState = computed(() => {
	return roomList.value.length === 0;
});

onMounted(() => {
	fetchRoomList();
});
</script>
