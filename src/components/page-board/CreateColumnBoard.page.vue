<template>
	<p>Add board to {{ courseId }}</p>
</template>

<script setup lang="ts">
import { useBoardApi } from "@data-board";
import { toRef } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
	courseId: {
		type: String,
		required: true,
	},
});

const { createBoardCall } = useBoardApi();
const router = useRouter();
const courseIdRef = toRef(props, "courseId");

try {
	const board = await createBoardCall(courseIdRef.value);
	await router.push(`/rooms/${board.id}/board`);
} catch (error) {
	await router.push(`/error`);
}
</script>
