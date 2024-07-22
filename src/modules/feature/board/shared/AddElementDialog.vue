<template>
	<VDialog
		v-model="isDialogOpen"
		data-testid="element-type-selection"
		:width="dialogWidth"
	>
		<VCard>
			<VCardTitle class="text-h4 text-break px-6 pt-4">
				{{ $t("components.elementTypeSelection.dialog.title") }}
			</VCardTitle>
			<VCardText class="d-flex justify-center">
				<div
					class="d-flex flex-sm-row flex-wrap align-items-center"
					:class="{ 'justify-content-space-between': submissionsEnabled }"
				>
					<v-btn
						v-for="(item, key) in elementTypeOptions"
						:key="key"
						variant="text"
						size="large"
						:height="84"
						:width="126"
						class="d-sm-flex button-alignment-center"
						:data-testid="item.testId"
						@click.stop="item.action"
					>
						<span
							class="d-flex flex-column justify-content-center button-max-width"
						>
							<span>
								<v-icon size="x-large">{{ item.icon }}</v-icon>
							</span>
							<span class="subtitle">{{ $t(item.label) }}</span>
						</span>
					</v-btn>
				</div>
			</VCardText>
			<VCardActions class="mb-2 px-6">
				<VBtn
					data-testid="dialog-close"
					variant="outlined"
					@click="onCloseDialog"
				>
					{{ $t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script lang="ts">
import { ContentElementType } from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed, ComputedRef, defineComponent } from "vue";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

export default defineComponent({
	name: "AddElementDialog",
	setup(props, { emit }) {
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

		const { isDialogOpen, closeDialog, elementTypeOptions } =
			useSharedElementTypeSelection();

		const onCloseDialog = (_: boolean, event: Event) => {
			event?.stopPropagation();
			closeDialog();
		};

		const onAddElement = (eventType: string, type: ContentElementType) =>
			emit(eventType, type);

		const submissionsEnabled =
			envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED;

		const dialogWidth: ComputedRef<number> = computed(() =>
			elementTypeOptions.value.length >= 3 ? 426 : 320
		);

		return {
			onAddElement,
			onCloseDialog,
			elementTypeOptions,
			isDialogOpen,
			submissionsEnabled,
			dialogWidth,
		};
	},
});
</script>

<style scoped>
.subtitle {
	overflow-wrap: break-word;
	white-space: normal;
}

.button-max-width {
	max-width: 100px;
}
</style>
