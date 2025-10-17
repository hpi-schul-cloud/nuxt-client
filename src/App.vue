<template>
	<v-app>
		<component :is="layout">
			<router-view />
		</component>
	</v-app>
</template>

<script setup lang="ts">
import { availableLayouts, isLayout } from "./layouts";
import { setComputedScrollbarWidthAsCssVar } from "./utils/scrollbarWidth";
import { Layouts } from "@/layouts/types";
import { useAppStore } from "@data-app";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

setComputedScrollbarWidthAsCssVar();

const layout = computed(() => {
	const isLoggedIn = useAppStore().isLoggedIn;
	const requestedLayout = route.meta.layout as string | undefined;

	const layoutName = isLoggedIn ? requestedLayout || Layouts.LOGGED_IN : requestedLayout || Layouts.LOGGED_OUT;

	if (isLayout(layoutName)) {
		return availableLayouts[layoutName];
	} else {
		throw new Error(`Unknown layout '${layoutName}'`);
	}
});
</script>
