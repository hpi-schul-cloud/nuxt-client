<!-- TODO REMOVE THIS PAGE -->
<template>
	<div>
		<h1 data-testid="greeting">{{ greeting }}</h1>
		<VBtn data-testid="increment" @click="increment">Increment</VBtn>
		<p data-testid="count">Count: {{ count }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(0);

function increment() {
	count.value++;
}

const greeting = computed(() =>
	count.value === 0 ? "Hello, World!" : "You clicked!"
);
</script>
