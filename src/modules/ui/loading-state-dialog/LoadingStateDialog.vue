<template>
	<div>
		<v-dialog
			v-model="isDialogOpen"
			width="300"
			:scrim="!loadingState.hasOverlay"
			:persistent="loadingState.isPersistent"
		>
			<v-card class="px-2 py-3">
				<v-card-text class="pb-0">
					<div class="mb-2 text-center" data-testid="dialog-text">
						{{ loadingState.text }}
					</div>
					<v-progress-linear indeterminate color="primary" class="mb-2" />
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@data-app";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const loadingStore = useLoadingStore();
const { loadingState, isLoading } = storeToRefs(loadingStore);
const { setLoadingState } = loadingStore;

const isDialogOpen = computed({
	get: () => isLoading.value,
	set: () => setLoadingState(false),
});
</script>
