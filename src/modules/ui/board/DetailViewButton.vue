<template>
	<VBtn
		variant="text"
		data-testid="open-detail-view-btn"
		:ripple="false"
		class="bg-white pt-1"
		icon
		size="36"
		@click.stop.prevent="() => onOpenDetailView()"
		@dblclick.stop.prevent="() => {}"
		@keyup.enter.space.stop
		@keydown.enter.space.stop
		@keydown.left.right.up.down.stop="() => {}"
	>
		<VIcon data-testid="board-menu-icon">{{ mdiFullscreen }}</VIcon>
		<span data-testid="board-menu-screen-reader-only" class="d-sr-only"
			>{{ t("components.board.action.detail-view") }}
		</span>
	</VBtn>
</template>

<script setup lang="ts">
import { mdiFullscreen } from "@icons/material";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["open-detail-view"]);
const { t } = useI18n();

const onOpenDetailView = () => {
	emit("open-detail-view");
};
</script>
