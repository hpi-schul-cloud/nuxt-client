<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="components.elementTypeSelection.dialog.title"
		data-testid="element-type-selection"
		:is-loading="isDialogLoading"
		no-confirm
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
	</SvsDialog>
</template>

<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { SvsDialog } from "@ui-dialog";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";

const { isDialogOpen, isDialogLoading, elementTypeOptions } = useSharedElementTypeSelection();
</script>
