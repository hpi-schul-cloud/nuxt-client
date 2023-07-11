<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router/composables";
import { APPLICATION_ERROR_KEY, injectStrict } from "@/utils/inject";

/**
 * This component handles the routing to "/error" whenever a global Error is set in ApplicationErrorModule
 */
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ApplicationErrorRouting",
	setup() {
		const router = useRouter();

		const applicationErrorModule = injectStrict(APPLICATION_ERROR_KEY);

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
