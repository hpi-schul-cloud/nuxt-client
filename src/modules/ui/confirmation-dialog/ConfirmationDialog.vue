<template>
	<VDialog v-model="isDialogOpen" data-testid="delete-dialog-item" :max-width="480">
		<UseFocusTrap>
			<VCard>
				<template #title>
					<h2 class="ma-2 dialog-title" data-testid="dialog-title">
						{{ message }}
					</h2>
				</template>

				<div v-if="$slots.alert" class="alert-text mx-6 mb-4">
					<slot name="alert" />
				</div>

				<template #actions>
					<v-spacer />
					<div class="d-flex mb-2 gap-2 mx-4">
						<VBtn data-testid="dialog-cancel" variant="text" :text="t('common.actions.cancel')" @click="cancel" />
						<VBtn
							data-testid="dialog-confirm"
							class="px-6"
							color="primary"
							variant="flat"
							:text="t(confirmBtnLangKey)"
							@click="confirm"
						/>
					</div>
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { confirm, cancel, dialogOptions, isDialogOpen } = useInternalConfirmationDialog();

const message = computed(() => (dialogOptions.value ? dialogOptions.value.message : ""));

const confirmBtnLangKey = computed(() => dialogOptions.value?.confirmActionLangKey ?? "common.actions.confirm");
</script>

<style scoped>
.dialog-title {
	white-space: normal;
	hyphens: none;
	word-break: break-word;
	line-height: var(--line-height-lg);
}

.alert-text {
	line-height: var(--line-height-lg);
}
</style>
