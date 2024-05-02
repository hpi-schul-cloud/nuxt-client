<template>
	<v-app>
		<component :is="layout">
			<router-view />
		</component>
	</v-app>
</template>

<script setup lang="ts">
import { Layouts } from "@/layouts/types";
import { computed, defineAsyncComponent } from "vue";
import {
	injectStrict,
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
} from "@/utils/inject";
import { useRoute } from "vue-router";

const authModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const route = useRoute();

const shouldUseNewLayout = envConfigModule.getEnv.FEATURE_NEW_LAYOUT_ENABLED;
const defaultLayout = shouldUseNewLayout
	? Layouts.NEW_LOGGED_IN
	: Layouts.LOGGED_IN;

const layout = computed(() => {
	let layout = defaultLayout;

	if (route.meta.layout) {
		layout = route.meta.layout as Layouts;
	} else {
		layout = authModule.isLoggedIn ? layout : Layouts.LOGGED_OUT;
	}

	return defineAsyncComponent(() => import(`@/layouts/${layout}.layout.vue`));
});
</script>
