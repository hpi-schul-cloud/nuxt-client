<template>
	<template v-if="room">
		<div>
			<!-- content goes here-->
		</div>
	</template>
</template>

<script setup lang="ts">
import { RoomDetails } from "@/types/room/Room";
import { PropType, toRef } from "vue";

const props = defineProps({
	room: { type: Object as PropType<RoomDetails> },
});

const room = toRef(props, "room");
</script>

<style scoped>
.margin-bottom {
	margin-bottom: var(--space-md);
}
</style>
