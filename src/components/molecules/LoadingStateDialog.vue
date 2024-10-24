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

<script>
import { computed, defineComponent, inject } from "vue";

export default defineComponent({
	name: "LoadingStateDialog",
	setup() {
		const loadingStateModule = inject("loadingStateModule");
		const loadingState = computed(() => loadingStateModule.getLoadingState);

		const isDialogOpen = computed({
			get: () => loadingStateModule.getIsOpen,
			set: () => loadingStateModule.close(),
		});

		return {
			loadingState,
			isDialogOpen,
		};
	},
});
</script>
