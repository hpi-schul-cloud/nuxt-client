<template>
	<template v-if="room">
		<div>
			<!-- content goes here-->
		</div>
	</template>
</template>

<script setup lang="ts">
import { RoomDetails } from "@/types/room/Room";
import { computed, PropType } from "vue";

const props = defineProps({
	room: { type: Object as PropType<RoomDetails> },
});

const room = computed(() => props.room);
</script>

<style scoped>
.margin-bottom {
	margin-bottom: var(--space-md);
}
</style>
