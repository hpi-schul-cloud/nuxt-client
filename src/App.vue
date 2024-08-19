<template>
	<v-app>
		<Suspense>
			<template #default>
				<component :is="layout">
					<router-view />
				</component>
			</template>
			<template #fallback>
				<p>Loading...</p>
			</template>
		</Suspense>
	</v-app>
</template>

<script setup lang="ts">
import { Layouts } from "@/layouts/types";
import { computed, defineAsyncComponent } from "vue";
import { injectStrict, AUTH_MODULE_KEY } from "@/utils/inject";
import { useRoute } from "vue-router";

const authModule = injectStrict(AUTH_MODULE_KEY);
const route = useRoute();

const layout = computed(() => {
	let layout = (route.meta.layout as Layouts) || Layouts.LOGGED_IN;

	if (!authModule.isLoggedIn) {
		layout = Layouts.LOGGED_OUT;
	}

	return defineAsyncComponent(() => import(`@/layouts/${layout}.layout.vue`));
});
</script>
