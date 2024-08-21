<template>
	<DefaultWireframe max-width="short">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Rooms [TODO translation]</h1>
		</template>
		<!-- TODO RoomsGrid, RoomTile -->

		<template v-if="isLoading">
			<VContainer class="loader">
				<p>Loading content - TODO component</p>
			</VContainer>
		</template>
		<template v-else-if="isEmpty">
			<p>Empty state [TODO component]</p>
		</template>
		<template v-else>
			<p>Content [TODO component]</p>
			<ul>
				<li v-for="room in rooms" :key="room.id">
					{{ room.title }}
				</li>
			</ul>
		</template>
	</DefaultWireframe>
</template>
<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useRoomsState } from "@data-room";
import { onMounted } from "vue";

const { rooms, isLoading, isEmpty, fetchRooms } = useRoomsState();

onMounted(() => {
	fetchRooms();
});
</script>
