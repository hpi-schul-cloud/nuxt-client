<template>
	<div><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent, inject, onErrorCaptured, onUnmounted, ref, watch, } from "@vue/composition-api";
import ApplicationErrorModule from "@store/application-error";
import { useRouter } from "@nuxtjs/composition-api";
import { ApplicationError } from "@/composables/application-error.composable";

/**
 * This component handles the routing to "/error" whenever a global Error is set in ApplicationErrorModule
 */
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ApplicationErrorRouting",
	setup() {
		const router = useRouter();

		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
			"applicationErrorModule"
		);

		if (applicationErrorModule === undefined) {
			throw new Error("ApplicationErrorRouting: Modules are not initialized");
		}

		const hasError = ref<boolean>(applicationErrorModule.getError !== null);

		const routeToErrorPage = () => {
			router.replace("/error");
		};

		onErrorCaptured((err: ApplicationError | Error) => {
			if (err instanceof ApplicationError) {
				applicationErrorModule.setError({
					statusCode: err.statusCode,
					messageTranslationKey: err.translationKey,
				});
				return false;
			}

			applicationErrorModule.setError({
				statusCode: 500,
				messageTranslationKey: "error.generic",
			});

			return false;
		});

		watch(
			() => applicationErrorModule.getError,
			(to) => {
				to !== null ? routeToErrorPage() : null;
			},
			{ immediate: true }
		);

		onUnmounted(() => console.log("Component destroyed"));

		return { hasError };
	},
});
</script>
