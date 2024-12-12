<template>
	<!-- ToDo: Styling -->
	<VDialog
		v-model="isDialogOpen"
		data-testid="delete-dialog-item"
		:max-width="480"
	>
		<UseFocusTrap>
			<VCard>
				<template #title>
					<h2 class="text-h4 dialog-title">
						{{ message }}
					</h2>
				</template>

				<template #actions>
					<VSpacer />
					<!-- <div class="action-buttons"> -->
					<VBtn
						data-testid="dialog-cancel"
						variant="text"
						:text="t('common.actions.cancel')"
						@click="cancel"
					/>
					<VBtn
						data-testid="dialog-confirm"
						color="primary"
						variant="flat"
						:text="t(confirmBtnLangKey)"
						@click="confirm"
					/>
					<!-- </div> -->
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import { useI18n } from "vue-i18n";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";

const { t } = useI18n();
const { confirm, cancel, dialogOptions, isDialogOpen } =
	useInternalConfirmationDialog();

const message = computed(() =>
	dialogOptions.value ? dialogOptions.value.message : ""
);

const confirmBtnLangKey = computed(() =>
	dialogOptions.value
		? dialogOptions.value.confirmActionLangKey
		: "common.actions.confirm"
);
</script>

<style scoped>
.action-buttons {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
	gap: calc(var(--space-base-vuetify) * 2);
}

.dialog-title {
	white-space: normal;
	hyphens: none;
	word-break: break-word;
}
</style>
