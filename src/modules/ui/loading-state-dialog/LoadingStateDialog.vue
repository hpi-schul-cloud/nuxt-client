<template>
	<VDialog v-model="isDialogOpen" width="300" :scrim="false" persistent>
		<VCard class="px-2 py-3">
			<VCardText class="pb-0">
				<div class="mb-2 text-center" data-testid="dialog-text">
					{{ loadingText }}
				</div>
				<VProgressLinear indeterminate class="mb-2" />
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@data-app";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const loadingStore = useLoadingStore();
const { loadingText, isLoading } = storeToRefs(loadingStore);
const { setLoadingState } = loadingStore;

const isDialogOpen = computed({
	get: () => isLoading.value,
	set: () => setLoadingState(false),
});
</script>
