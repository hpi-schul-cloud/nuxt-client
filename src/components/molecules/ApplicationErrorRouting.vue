<template>
	<div />
</template>

<script setup lang="ts">
import { useAppStoreRefs } from "@data-app";
import { watch } from "vue";
import { useRouter } from "vue-router";

/**
 * This component handles the routing to "/error" whenever a global Error is set
 */

const router = useRouter();

const routeToErrorPage = () => {
	// prevent NavigationDuplicated error: "navigationduplicated avoided redundant navigation to current location"
	if (router.currentRoute.value.path !== "/error") {
		router.replace("/error");
	}
};

const { applicationError } = useAppStoreRefs();

watch(
	() => applicationError.value?.status,
	(to) => {
		if (to !== undefined) {
			routeToErrorPage();
		}
	},
	{ immediate: true }
);
</script>
