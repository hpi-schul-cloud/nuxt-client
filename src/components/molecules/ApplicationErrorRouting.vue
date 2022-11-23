<template>
	<div><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "@vue/composition-api";
import ApplicationErrorModule from "@store/application-error";
import { useRouter, watch } from "@nuxtjs/composition-api";
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

		const hasError = ref<boolean>(applicationErrorModule.getError !== null);

		const routeToErrorPage = () => {
			router.replace("/error");
		};

		watch(
			() => applicationErrorModule.getError,
			(to) => {
				to !== null ? routeToErrorPage() : null;
			},
			{ immediate: true }
		);

		return { hasError };
	},
});
</script>
