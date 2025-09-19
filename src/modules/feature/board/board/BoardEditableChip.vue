<template>
	<VChip
		size="small"
		color="info"
		class="align-self-center cursor-default"
		data-testid="board-editable-chip"
	>
		<div class="chip-content">
			<v-icon left class="icon mr-2">{{ mdiPencilPlusOutline }}</v-icon>
			<span>
				{{ t("components.board.header.chip.editableForEveryone") }}
			</span>
		</div>
	</VChip>
</template>

<script setup lang="ts">
import { mdiPencilPlusOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.chip-content {
	color: rgba(var(--v-theme-on-surface));
}
.icon {
	color: rgba(var(--v-theme-on-surface), 0.8);
}
</style>
