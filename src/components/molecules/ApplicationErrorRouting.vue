<template>
	<div />
</template>

<script setup lang="ts">
import { APPLICATION_ERROR_KEY, injectStrict } from "@/utils/inject";
import { watch } from "vue";
import { useRouter } from "vue-router";

/**
 * This component handles the routing to "/error" whenever a global Error is set in ApplicationErrorModule
 */

const router = useRouter();

const applicationErrorModule = injectStrict(APPLICATION_ERROR_KEY);

const routeToErrorPage = () => {
	// prevent NavigationDuplicated error: "navigationduplicated avoided redundant navigation to current location"
	if (router.currentRoute.value.path !== "/error") {
		router.replace("/error");
	}
};

//watch(
//	() => applicationErrorModule.getStatusCode,
//	(to) => {
//		if (to !== null) {
//			routeToErrorPage();
//		}
//	},
//	{ immediate: true }
//);
</script>
