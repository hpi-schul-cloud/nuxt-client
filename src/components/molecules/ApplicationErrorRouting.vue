<template>
	<span class="sr-only"> ABC: hasError {{ hasError }}</span>
</template>

<script lang="ts">
import { defineComponent, inject, onUnmounted, ref, watch, } from "@vue/composition-api";
import ApplicationErrorModule from "@store/application-error";
import { useRouter } from "@nuxtjs/composition-api";

/**
 * This component handles the routing to "/error" whenever a global Error is set in ApplicationErrorModule
 */
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ApplicationErrorRouting",
	setup() {
		const router = useRouter();

		const applicationErrorModule: ApplicationErrorModule | undefined = inject(
			"applicationErrorModule"
		);

		if (applicationErrorModule === undefined) {
			throw new Error("ApplicationErrorRouting: Modules are not initialized");
		}

		const hasError = ref<boolean>(applicationErrorModule.getError !== null);

		const routeToErrorPage = () => {
			console.log("ROUTER: has been called");
			router.replace("/error");
		};

		watch(hasError, (to, from) => {
			console.log("WATCHER: ", from, to);
			from === false && to !== true ? routeToErrorPage() : null;
		});

		watch(
			() => applicationErrorModule.getError,
			(to, from) => {
				console.log("WATCHER on store getter: ", from, to);
				to !== null ? routeToErrorPage() : null;
			},
			{ immediate: true }
		);

		onUnmounted(() => console.log("Component destroyed"));

		return { hasError };
	},
});
</script>
