<template>
	<Dialog
		v-model="isDialogOpen"
		:title="t('components.elementTypeSelection.dialog.title')"
		:is-loading="isDialogLoading"
		data-testid="element-type-selection"
	>
		<template #content>
			<div class="d-flex flex-row flex-wrap align-center">
				<ExtendedIconBtn
					v-for="(item, key) in elementTypeOptions"
					:key="key"
					:data-testid="item.testId"
					:icon="item.icon"
					:label="item.label"
					@click.stop="item.action"
				/>
			</div>
		</template>
		<template #actions>
			<DialogBtnClose data-testid="dialog-close" variant="outlined" @click.stop="closeDialog" />
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { Dialog, DialogBtnClose } from "@ui-dialog";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import { useI18n } from "vue-i18n";

const { isDialogOpen, isDialogLoading, closeDialog, elementTypeOptions } = useSharedElementTypeSelection();

const { t } = useI18n();
</script>
