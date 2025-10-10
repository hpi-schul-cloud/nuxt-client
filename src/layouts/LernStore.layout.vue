<template>
	<LoggedIn v-if="isCollection" />
	<router-view v-else />
</template>

<script setup lang="ts">
import LoggedIn from "./LoggedIn.layout.vue";
import { CONTENT_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed } from "vue";
import { useRoute } from "vue-router";

const contentModule = injectStrict(CONTENT_MODULE_KEY);
const route = useRoute();

const isCollection = computed(
	() => String(route.query.isCollection) === "true" && contentModule.getCollectionsFeatureFlag === true
);
</script>
