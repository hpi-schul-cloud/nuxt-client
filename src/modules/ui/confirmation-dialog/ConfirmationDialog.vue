<template>
	<!-- ToDo:  use component <UseFocusTrap>  -->
	<!-- WIP: replace custom dialog with v-dialog -->
	<VDialog v-model="isDialogOpen" data-testid="delete-dialog-item" :width="480">
		<VCard>
			<template #title>
				<h2 class="text-h4 my-2 text-break-word dialog-title">{{ message }}</h2>
			</template>

			<template #actions>
				<v-btn
					data-testid="dialog-cancel"
					variant="text"
					:text="t('common.actions.cancel')"
					@click="onCloseDialog"
				/>
				<v-btn
					data-testid="dialog-confirm"
					color="primary"
					variant="flat"
					:text="t(confirmBtnLangKey)"
					@click="onConfirmation"
				/>
			</template>
		</VCard>
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
.text-break-word {
	word-break: break-word;
}

.dialog-title {
	white-space: normal;
	hyphens: none;
	word-break: break-word;
}
</style>
