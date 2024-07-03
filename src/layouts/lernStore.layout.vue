<template>
	<newLoggedIn v-if="isCollection" />
	<router-view v-else />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { injectStrict, CONTENT_MODULE_KEY } from "@/utils/inject";
import newLoggedIn from "./newLoggedIn.layout.vue";

const contentModule = injectStrict(CONTENT_MODULE_KEY);
const route = useRoute();

const isCollection = computed(() => {
	return (
		String(route.query.isCollection) === "true" &&
		contentModule.getCollectionsFeatureFlag === true
	);
});
</script>
