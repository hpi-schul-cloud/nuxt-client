<template>
	<a href="/">
		<img
			v-if="isDesktop"
			src="@/assets/img/logo/logo-image-mono.svg"
			alt="Schulcloud Logo"
		/>
		<img
			v-if="isTablet"
			src="@/assets/img/logo/logo-transparent-mono-48-48.svg"
			alt="Schulcloud Logo"
		/>
	</a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { mdAndDown, xs, lgAndUp } = useDisplay();

const isTablet = computed(() => {
	return mdAndDown.value && !xs.value;
});

const isDesktop = computed(() => {
	return lgAndUp.value;
});
</script>
