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
import { injectStrict, AUTH_MODULE_KEY } from "@/utils/inject";
import { useRoute } from "vue-router";

import { availableLayouts, isLayout } from "./layouts";

const authModule = injectStrict(AUTH_MODULE_KEY);
const route = useRoute();

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
