<template>
	<Dialog
		v-model:is-dialog-open="isCollaboraDialogOpen"
		message="Dokument erstellen"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<ExtendedIconBtn
				v-for="(item, key) in collaboraElementTypeOptions"
				:key="key"
				:data-testid="item.testId"
				:icon="item.icon"
				:label="item.label"
				@click.stop="item.action"
			/>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { Dialog } from "@ui-dialog";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";

const { isCollaboraDialogOpen, collaboraElementTypeOptions } = useSharedElementTypeSelection();

const onCancel = () => {
	isCollaboraDialogOpen.value = false;
};

const onConfirm = async () => {
	// eslint-disable-next-line no-console
	console.log("click confirm");
};
</script>
