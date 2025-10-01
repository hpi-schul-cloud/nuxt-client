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
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed } from "vue";
import { useRoute } from "vue-router";

const authModule = injectStrict(AUTH_MODULE_KEY);
const route = useRoute();

setComputedScrollbarWidthAsCssVar();

const layout = computed(() => {
	let layoutName = (route.meta.layout as string) || Layouts.LOGGED_IN;

	if (!authModule.isLoggedIn) {
		layoutName = Layouts.LOGGED_OUT;
	}

	if (isLayout(layoutName)) {
		return availableLayouts[layoutName];
	} else {
		throw new Error(`Unknown layout '${layoutName}'`);
	}
});
</script>
