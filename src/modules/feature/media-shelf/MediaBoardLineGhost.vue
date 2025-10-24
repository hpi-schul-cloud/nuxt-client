<template>
	<div class="mx-n4 px-4">
		<BoardSectionCreationHeader
			data-testid="create-line-button"
			:is-column-active="false"
			:label="$t('feature.media-shelf.createLine')"
			@add-column="$emit('create:line')"
		/>
		<Sortable
			:list="[]"
			item-key="id"
			tag="div"
			:options="{
				group: 'elements',
				direction: 'horizontal',
				delay: 200,
				delayOnTouchOnly: true,
				disabled: false,
				ghostClass: 'sortable-drag-ghost',
				easing: 'cubic-bezier(1, 0, 0, 1)',
				dragoverBubble: true,
				draggable: '.draggable',
				animation: 250,
				forceFallback: true,
				bubbleScroll: true,
			}"
			class="d-flex flex-grid flex-shrink-1 pa-2 ga-6 flex-1-1"
			data-testid="ghost-line-space"
		/>
	</div>
</template>

<script setup lang="ts">
import { BoardSectionCreationHeader } from "@ui-board";
import { Sortable } from "sortablejs-vue3";

defineEmits<{ (e: "create:line"): void }>();
</script>
