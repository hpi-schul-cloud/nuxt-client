<template>
	<v-app>
		<div class="d-flex justify-center gap-2 pa-2">
			<v-btn @click="askBeforeDelete">Delete</v-btn>
			<v-btn @click="askForName">Prompt</v-btn>
			<v-btn @click="askDeletion('Delete item', 'Are you sure you want to delete this item?')"
				>Delete with Confirmation
			</v-btn>
			<v-btn @click="count++">Count: {{ count }}</v-btn>
		</div>
		<component :is="layout">
			<router-view />
		</component>
		<DialogHost />
	</v-app>
</template>

<script setup lang="ts">
import { availableLayouts, isLayout } from "./layouts";
import DialogHost from "./modules/feature/dialog/DialogHost.vue";
import { askBeforeDelete, askDeletion, askForName } from "./modules/feature/dialog/example-usage";
import { setComputedScrollbarWidthAsCssVar } from "./utils/scrollbarWidth";
import { Layouts } from "@/layouts/types";
import { useAppStore } from "@data-app";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const count = ref(0);

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
