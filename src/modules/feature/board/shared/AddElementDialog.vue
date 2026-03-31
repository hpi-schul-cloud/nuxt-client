<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="components.elementTypeSelection.dialog.title"
		data-testid="element-type-selection"
		:is-loading="isDialogLoading"
		no-confirm
	>
		<template #content>
			<div class="elements-grid">
				<VBtn
					v-for="item in elementTypeOptions"
					:key="item.label"
					:data-testid="item.testId"
					height="auto"
					variant="text"
					size="large"
					@click.stop="item.action"
				>
					<div class="d-flex flex-column justify-center">
						<VIcon size="x-large" class="mx-auto">{{ item.icon }}</VIcon>
						<span class="mt-1 text-wrap">
							{{ item.label }}
						</span>
					</div>
				</VBtn>
			</div>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { SvsDialog } from "@ui-dialog";

const { isDialogOpen, isDialogLoading, elementTypeOptions } = useSharedElementTypeSelection();
</script>
<style lang="scss" scoped>
.elements-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
	grid-auto-rows: 85px;
}
</style>
