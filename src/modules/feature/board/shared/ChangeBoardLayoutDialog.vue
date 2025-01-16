<template>
	<VDialog
		v-model="isDialogOpen"
		data-testid="change-board-layout-dialog"
		:max-width="480"
	>
		<VCard :ripple="false" data-testid="dialog-content">
			<template #title>
				<h2 class="text-h4 ma-2 dialog-title" data-testid="dialog-title">
					{{ $t("components.board.action.changeLayout") }}
				</h2>
			</template>
			<template #text>
				<VRadioGroup v-model="selectedLayout">
					<VRadio
						density="compact"
						:label="$t('pages.room.dialog.boardLayout.multiColumn')"
						:value="BoardLayout.Columns"
					/>
					<span class="ml-7 mb-4 text-medium-emphasis">
						{{
							$t(
								"components.changeBoardLayoutDialog.boardLayout.multiColumn.explanation"
							)
						}}
					</span>
					<VRadio
						density="compact"
						:label="$t('pages.room.dialog.boardLayout.singleColumn')"
						:value="BoardLayout.List"
					/>
					<span class="ml-7 text-medium-emphasis">
						{{
							$t(
								"components.changeBoardLayoutDialog.boardLayout.singleColumn.explanation"
							)
						}}
					</span>
				</VRadioGroup>
			</template>
			<template #actions>
				<VBtn
					data-testid="dialog-close"
					class="px-4"
					variant="text"
					@click.stop="closeDialog"
				>
					{{ $t("common.actions.cancel") }}
				</VBtn>
				<VBtn
					data-testid="dialog-confirm"
					class="px-4"
					color="primary"
					variant="flat"
					@click.stop="confirmDialog"
				>
					{{ $t("common.actions.save") }}
				</VBtn>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/serverApi/v3";
import { ModelRef, PropType, Ref, ref, watch } from "vue";

const props = defineProps({
	currentLayout: {
		type: String as PropType<BoardLayout>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "change-layout", layout: BoardLayout): void;
}>();

const isDialogOpen: ModelRef<boolean> = defineModel("isDialogOpen", {
	type: Boolean,
	required: true,
});

const selectedLayout: Ref<BoardLayout> = ref(BoardLayout.Columns);

watch(isDialogOpen, (value) => {
	if (value) {
		selectedLayout.value = props.currentLayout;
	}
});

const closeDialog = () => {
	isDialogOpen.value = false;
};

const confirmDialog = () => {
	emit("change-layout", selectedLayout.value);

	closeDialog();
};
</script>

<style scoped>
.dialog-title {
	white-space: normal;
	hyphens: none;
	word-break: break-word;
	line-height: var(--line-height-lg);
}
</style>
