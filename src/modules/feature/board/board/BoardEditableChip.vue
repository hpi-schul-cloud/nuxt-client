<template>
	<VChip
		size="small"
		color="info"
		class="align-self-center cursor-default"
		data-testid="board-editable-chip"
	>
		<div class="chip-content">
			<v-icon left class="mr-2" color="">{{ mdiPencilPlusOutline }}</v-icon>
			<span>
				{{ $t("components.board.header.chip.editableForEveryone") }}
			</span>
		</div>
	</VChip>
</template>

<script setup lang="ts">
import { mdiPencilPlusOutline } from "@icons/material";
</script>

<style lang="scss" scoped>
.chip-content {
	color: rgba(var(--v-theme-on-surface));
}
</style>
