<template>
	<VDialog v-model="isDialogOpen" width="300" :scrim="!loadingState.hasOverlay" :persistent="loadingState.isPersistent">
		<VCard class="px-2 py-3">
			<VCardText class="pb-0">
				<div class="mb-2 text-center" data-testid="dialog-text">
					{{ loadingState.text }}
				</div>
				<VProgressLinear indeterminate color="primary" class="mb-2" />
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { injectStrict, LOADING_STATE_MODULE_KEY } from "@/utils/inject";
import { computed } from "vue";

const loadingStateModule = injectStrict(LOADING_STATE_MODULE_KEY);
const loadingState = computed(() => loadingStateModule.getLoadingState);

const isDialogOpen = computed({
	get: () => loadingStateModule.getIsOpen,
	set: () => loadingStateModule.close(),
});
</script>
