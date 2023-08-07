<template>
	<div>Test component <TestBoard></TestBoard></div>
</template>

<script lang="ts">
import { TestBoard } from "@feature-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Test",
	components: { TestBoard },
});
</script>
