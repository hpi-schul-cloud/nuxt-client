<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="components.elementTypeSelection.dialog.title"
		:is-loading="isDialogLoading"
		data-testid="element-type-selection"
	>
		<template #content>
			<div class="d-flex flex-row flex-wrap align-center justify-space-between">
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
			<SvsDialogBtnCancel @click.stop="closeDialog" />
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { SvsDialog, SvsDialogBtnCancel } from "@ui-dialog";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";

const { isDialogOpen, isDialogLoading, closeDialog, elementTypeOptions } = useSharedElementTypeSelection();
</script>
