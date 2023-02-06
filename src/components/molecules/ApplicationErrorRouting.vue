<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import ApplicationErrorModule from "@/store/application-error";
import { watch } from "vue";
import { useRouter } from "vue-router/composables";
import { useApplicationError } from "@/composables/application-error.composable";

/**
 * This component handles the routing to "/error" whenever a global Error is set in ApplicationErrorModule
 */
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ApplicationErrorRouting",
	setup() {
		const router = useRouter();

		const { createApplicationError } = useApplicationError();

		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
			"applicationErrorModule"
		);

		if (applicationErrorModule === undefined) {
			throw createApplicationError(500);
		}

		const routeToErrorPage = () => {
			// prevent NavigationDuplicated error: "navigationduplicated avoided redundant navigation to current location"
			if (router.currentRoute.path !== "/error") {
				router.replace("/error");
			}
		};

		watch(
			() => applicationErrorModule.getStatusCode,
			(to) => {
				to !== null ? routeToErrorPage() : null;
			},
			{ immediate: true }
		);
	},
});
</script>
