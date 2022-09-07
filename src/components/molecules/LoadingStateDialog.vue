<template>
	<div>
		<button @click="onClick">OpenDialog</button>
		<button @click="onClickClose">CloseDialog</button>
		{{ loadingState }} && {{ isDialogOpen }}
		<v-dialog
			v-model="isDialogOpen"
			width="300"
			:hide-overlay="!loadingState.hasOverlay"
			:persistent="loadingState.isPersistent"
		>
			<v-card class="px-2 py-3">
				<v-card-text class="pb-0">
					<div class="mb-2 text-center black--text">
						{{ loadingState.text }}
					</div>
					<v-progress-linear
						indeterminate
						color="primary"
						class="mb-2"
					></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { computed, defineComponent, inject } from "@vue/composition-api";

export default defineComponent({
	name: "LoadingStateDialog",
	setup() {
		const loadingStateModule = inject("loadingStateModule");
		const loadingState = computed(() => loadingStateModule.getLoadingState);

		const isDialogOpen = computed({
			get: () => loadingStateModule.getIsOpen,
			set: () => loadingStateModule.close(),
		});

		const onClick = async () => {
			loadingStateModule.open({
				text: "Import des Kurses läuft",
				hasOverlay: false,
			});
			await new Promise((resolve) => setTimeout(resolve, 1000));
			isDialogOpen.value = false;
		};

		const onClickClose = () => {
			loadingStateModule.open({
				text: "Import des Kurses läuft 2!",
				hasOverlay: true,
			});
		};

		return {
			onClick,
			onClickClose,
			loadingState,
			isDialogOpen,
		};
	},
});
</script>

<!--<style scoped></style>-->
