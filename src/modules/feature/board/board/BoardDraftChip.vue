<template>
	<VTooltip location="bottom" :text="$t('components.board.draftChip.tooltip')">
		<template #activator="{ props }">
			<VChip v-bind="props" class="align-self-center cursor-default" data-testid="board-draft-chip">
				{{ $t("common.words.draft") }}
			</VChip>
		</template>
	</VTooltip>
</template>
