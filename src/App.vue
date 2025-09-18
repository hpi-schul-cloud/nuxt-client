<template>
	<v-app>
		<component :is="layout">
			<router-view />
		</component>
	</v-app>
</template>

<script setup lang="ts">
import { Layouts } from "@/layouts/types";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { availableLayouts, isLayout } from "./layouts";
import { setComputedScrollbarWidthAsCssVar } from "./utils/scrollbarWidth";
import { useAuthStore } from "@data-auth";

const route = useRoute();

setComputedScrollbarWidthAsCssVar();

const layout = computed(() => {
	let layoutName = (route.meta.layout as string) || Layouts.LOGGED_IN;

	if (!useAuthStore().loggedIn) {
		layoutName = Layouts.LOGGED_OUT;
	}

	if (isLayout(layoutName)) {
		return availableLayouts[layoutName];
	} else {
		throw new Error(`Unknown layout '${layoutName}'`);
	}
});
</script>
