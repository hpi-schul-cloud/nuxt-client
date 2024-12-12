<template>
	<!-- ToDO: Styling Dialog -->
	<VDialog
		v-model="isDialogOpen"
		data-testid="delete-dialog-item"
		:max-width="480"
	>
		<UseFocusTrap>
			<VCard>
				<template #title>
					<h2 class="text-h4 my-2 dialog-title">
						{{ message }}
					</h2>
				</template>

				<template #actions>
					<v-spacer />
					<!-- <div class="action-buttons px-6"> -->
					<v-btn
						data-testid="dialog-cancel"
						variant="text"
						:text="t('common.actions.cancel')"
						@click="onCloseDialog"
					/>
					<v-btn
						data-testid="dialog-confirm"
						class="px-6"
						color="primary"
						variant="flat"
						:text="t(confirmBtnLangKey)"
						@click="onConfirmation"
					/>
					<!-- </div> -->
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
	<!-- <vCustomDialog
		data-testid="delete-dialog-item"
		has-buttons
		:confirm-btn-title-key="confirmBtnLangKey"
		@dialog-confirmed="onConfirmation"
		:is-open="isDialogOpen"
		@dialog-closed="onCloseDialog"
	>
		<template #title>
			<h2 class="text-h4 my-2 text-break-word">
				{{ message }}
			</h2>
		</template>
	</vCustomDialog> -->
</template>

<script setup lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed } from "vue";
import { useInternalConfirmationDialog } from "./Confirmation.composable";
import { useI18n } from "vue-i18n";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";

const { t } = useI18n();
const { confirm, cancel, dialogOptions, isDialogOpen } =
	useInternalConfirmationDialog();

const onConfirmation = () => confirm();
const onCloseDialog = () => {
	cancel();
};

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
